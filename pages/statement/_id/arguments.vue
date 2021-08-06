<template>
  <div>
    <header>
      <BackButton disable-navigation @click="goBack" />

      <h1>Argumente</h1>
      <div class="short-statement">
        <span v-if="!fetchState.pending">{{ proposal.short_statement }}</span>
      </div>
    </header>

    <div class="px-4">
      <Stepper :step="3" />

      <DecisionCard
        v-if="fetchState.timestamp"
        :value="currentArgument.statement"
        :index="index"
        :decisions="[
          { label: 'Stimme nicht zu', result: 'DISAGREE', icon: 'close' },
          { label: 'Stimme zu', result: 'AGREE', icon: 'favorite' }
        ]"
        @decision="save"
      />
    </div>

    <AppButton
      small
      class="feedback-btn"
      icon="chat"
      background="white"
      color="black"
      @click="feedbackDialog = true"
    />

    <AppButton
      small
      class="forward-btn"
      icon="arrow_forward"
      @click="save('NEUTRAL')"
    >
      Nicht sicher
    </AppButton>

    <BottomDialog :value.sync="feedbackDialog">
      <div v-for="(r, index) in reasons" :key="r.type">
        <span class="underline cursor-pointer" @click="confirm(r)">{{ r.description }}</span>
        <hr v-if="index !== reasons.length - 1" class="my-2">
      </div>
    </BottomDialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import { shuffle } from 'lodash'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import DecisionCard, { Index } from '~/components/DecisionCard.vue'
import BottomDialog from '~/components/BottomDialog.vue'
import useProposals from '~/store/useProposals'
import useGraphql from '~/composables/useGraphql'
import useConfirmationDialog from '~/composables/useConfirmationDialog'
import { Argument } from '~/@types/graphql-types'

type RaesonType = 'CONFUSING'|'MISTAKE'|'DISAGREE'|'OTHER'
type Raeson = {type: RaesonType, description: string}

export default defineComponent({
  components: {
    Stepper,
    AppButton,
    DecisionCard,
    BottomDialog
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { currentProposal: proposal, loadProposal } = useProposals()
    const client = useGraphql()
    const { confirm } = useConfirmationDialog()

    const args = ref<Argument[]>([])
    const currentArgumentIndex = ref(0)
    const feedbackDialog = ref(false)
    const currentArgument = computed(() => args.value[currentArgumentIndex.value])
    const index = computed<Index>(() => ({
      total: proposal.value ? proposal.value.arguments.length : 0,
      current: currentArgumentIndex.value + 1
    }))

    const id = parseInt(route.value.params.id)
    const { fetchState } = useFetch(async () => {
      await loadProposal(id)

      args.value = shuffle(proposal.value!.arguments as Argument[])
    })

    async function save (result: string) {
      const operation: IQueryBuilderOptions = {
        operation: 'upsertOpinion',
        variables: {
          input: {
            type: 'UpsertOpinionInput',
            required: true,
            value: {
              opinionable_id: currentArgument.value!.id,
              opinionable_type: 'App\\Models\\Argument',
              position: result
            }
          }
        },
        fields: ['id']
      }

      const q = mutation(operation)
      const { upsertOpinion } = await client.mutation(q.query, q.variables)

      if (!upsertOpinion) {
        console.log('Alarm')
        return
      }

      nextArgument()
    }

    function nextArgument () {
      if (currentArgumentIndex.value + 1 === proposal.value!.arguments.length) {
        router.push(`/statement/${id}/voting`)
        return
      }

      currentArgumentIndex.value += 1
    }

    return {
      index,
      proposal,
      fetchState,
      currentArgument,
      currentArgumentIndex,
      feedbackDialog,
      reasons: [
        { type: 'CONFUSING', description: 'Der Text ist verwirrend' },
        { type: 'MISTAKE', description: 'Im Text ist ein Fehler' },
        { type: 'DISAGREE', description: 'Ich stimme der Formulierung nicht zu' },
        { type: 'OTHER', description: 'Etwas anderes' }
      ] as Array<Raeson>,
      save,
      goBack () {
        if (currentArgumentIndex.value === 0) {
          router.go(-1)
        } else {
          currentArgumentIndex.value -= 1
        }
      },
      async confirm (reason: Raeson) {
        const sendFeedback = await confirm(
          'Feedback absenden?',
          `Möchtest du das Feedback "${reason.description}" wirklich absenden?`
        )
        if (!sendFeedback || !currentArgument.value) {
          feedbackDialog.value = false
          return
        }

        const q = mutation({
          operation: 'createFeedback',
          variables: {
            input: {
              type: 'CreateFeedbackInput',
              required: true,
              value: {
                feedbackable_id: currentArgument.value.id,
                feedbackable_type: 'App\\Models\\Argument',
                feedback: reason.type
              }
            }
          },
          fields: ['id']
        })

        const { createFeedback } = await client.mutation(q.query, q.variables)

        if (createFeedback) {
          console.log('Feedback was created')
        }

        feedbackDialog.value = false
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
header {
  height: 150px;
  background: #3A4090;
}

header h1 {
  color: white;
  font-size: 20pt;
  font-family: 'Bree Serif';

  @apply pt-8 font-bold text-center
}

.short-statement {
  color: white;

  @apply text-center font-light px-3
}

.forward-btn {
  bottom: 60px;
  right: 10px;
  background: rgba(65, 60, 177, 0.66);

  @apply absolute
}

.feedback-btn {
  bottom: 60px;
  left: 10px;

  @apply absolute
}
</style>
