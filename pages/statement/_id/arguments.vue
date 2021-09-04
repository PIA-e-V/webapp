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

    <div v-if="!fetchState.pending" id="feedback-btn" @click="feedbackDialog = true">
      <div class="grid auto-rows-auto gap-1 outline-none" style="grid-template-columns: 24px 80px">
        <div><span class="material-icons">feedback</span></div>
        <span class="underline" style="line-height: 18px">Feedback</span>
      </div>
    </div>

    <div v-if="!fetchState.pending" id="source">
      <Dialog :value="currentArgument.source">
        <div class="grid auto-rows-auto gap-1" style="grid-template-columns: 24px 50px">
          <div><span class="material-icons">info</span></div>
          <span>Quelle</span>
        </div>
      </Dialog>
    </div>

    <AppButton v-if="!fetchState.pending" small class="forward-btn" icon="arrow_forward" @click="save('NEUTRAL')">
      Nicht sicher
    </AppButton>

    <BottomDialog :value.sync="feedbackDialog">
      <div v-for="(r, index) in reasons" :key="r.type">
        <span class="underline cursor-pointer" @click="confirm(r)">{{ r.description }}</span>
        <hr v-if="index !== reasons.length - 1" class="my-2" />
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
import useNotifications from '~/composables/useNotifications'
import useFeedback, { Raeson } from '~/composables/useFeedback'

export default defineComponent({
  components: {
    Stepper,
    AppButton,
    DecisionCard,
    BottomDialog
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { currentProposal: proposal, loadProposal } = useProposals()
    const client = useGraphql()
    const { confirm } = useConfirmationDialog()
    const { success, error } = useNotifications()
    const { reasons, createFeedback } = useFeedback()

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

    async function save(result: string) {
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
        error('Es ist ein Fehler aufgetreten')
        return
      }

      nextArgument()
    }

    function nextArgument() {
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
      reasons,
      save,
      goBack() {
        if (currentArgumentIndex.value === 0) {
          router.go(-1)
        } else {
          currentArgumentIndex.value -= 1
        }
      },
      async confirm(reason: Raeson) {
        const sendFeedback = await confirm(
          'Feedback absenden?',
          `Möchtest du das Feedback "${reason.description}" wirklich absenden?`
        )
        if (!sendFeedback || !currentArgument.value) {
          feedbackDialog.value = false
          return
        }

        const created = await createFeedback(reason, currentArgument.value.id, 'App\\Models\\Argument', 3)

        if (created) {
          success('Dein Feedback wurde abgeschickt')
        }

        feedbackDialog.value = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  height: 120px;
  background: #3a4090;

  h1 {
    color: white;
    font-size: 20pt;
    font-family: 'Bree Serif';
    @apply pt-4 font-bold text-center;
  }

  #back-btn {
    top: 26px;
  }
}

.short-statement {
  color: white;
  @apply text-center font-light px-3;
}

.forward-btn {
  bottom: 60px;
  right: 10px;
  background: rgba(65, 60, 177, 0.66);
  @apply absolute;
}

#feedback-btn {
  left: 10px;
  bottom: 80px;
  @apply absolute cursor-pointer;
}

#source {
  left: 10px;
  bottom: 55px;
  @apply absolute;
}
</style>
