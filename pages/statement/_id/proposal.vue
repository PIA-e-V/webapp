<template>
  <div>
    <div class="px-4">
      <Stepper :step="4" />

      <DecisionCard
        :value="proposal.statement"
        :decisions="[
          { label: 'Dagegen', result: 'DISAGREE', icon: 'close' },
          { label: 'Neutral', result: 'NEUTRAL', icon: 'thumbs_up_down' },
          { label: 'Dafür', result: 'AGREE', icon: 'favorite' }
        ]"
        @decision="save"
      />
    </div>

    <div id="feedback-btn" @click="feedbackDialog = true">
      <div class="grid auto-rows-auto gap-1 outline-none" style="grid-template-columns: 24px 80px">
        <div><span class="material-icons">feedback</span></div>
        <span class="underline" style="line-height: 18px">Feedback</span>
      </div>
    </div>

    <div id="source">
      <Dialog :value="proposal.source_of_proposal">
        <div class="grid auto-rows-auto gap-1" style="grid-template-columns: 24px 50px">
          <div><span class="material-icons">info</span></div>
          <span>Quelle</span>
        </div>
      </Dialog>
    </div>

    <AppButton class="forward-btn" small icon="arrow_forward" @click="$router.push(`/statement/${proposal.id}/voting`)">
      Überspringen
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
import { PropType, defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import DecisionCard from '~/components/DecisionCard.vue'
import useGraphql from '~/composables/useGraphql'
import useNotifications from '~/composables/useNotifications'
import useConfirmationDialog from '~/composables/useConfirmationDialog'
import useFeedback, { Raeson } from '~/composables/useFeedback'
import { Proposal } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    Stepper,
    DecisionCard,
    AppButton
  },
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('titleChanged', 'Abstimmung')

    const router = useRouter()
    const client = useGraphql()
    const { confirm } = useConfirmationDialog()
    const { success } = useNotifications()
    const { reasons, createFeedback } = useFeedback()

    const feedbackDialog = ref(false)

    async function save(result: string) {
      const operation: IQueryBuilderOptions = {
        operation: 'upsertOpinion',
        variables: {
          input: {
            type: 'UpsertOpinionInput',
            required: true,
            value: {
              opinionable_id: props.proposal.id,
              opinionable_type: 'App\\Models\\Proposal',
              position: result
            }
          }
        },
        fields: ['id']
      }

      const q = mutation(operation)
      const { upsertOpinion } = await client.mutation(q.query, q.variables)

      if (upsertOpinion) {
        router.push(`/statement/${props.proposal.id}/voting`)
      } else {
        console.log('Alarm')
      }
    }

    return {
      reasons,
      feedbackDialog,
      save,
      async confirm(reason: Raeson) {
        const sendFeedback = await confirm(
          'Feedback absenden?',
          `Möchtest du das Feedback "${reason.description}" wirklich absenden?`
        )
        if (!sendFeedback) {
          feedbackDialog.value = false
          return
        }

        const created = await createFeedback(reason, id, 'App\\Models\\Proposal', 4)

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
