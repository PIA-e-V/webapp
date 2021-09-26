<template>
  <div class="proposal-container">
    <div class="px-4 h-full overflow-scroll flex flex-col">
      <h2>Was ist deine Meinung zu dem Antrag?</h2>

      <StatementCard :item="statement" />
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn">
          <span class="material-icons red">close</span>
        </div>
        Lehne ab
      </div>
      <div @click="save('NEUTRAL')">
        <div class="btn">
          <span class="material-icons gray">help_outline</span>
        </div>
        Neutral
      </div>
      <div @click="save('AGREE')">
        <div class="btn">
          <span class="material-icons green">done</span>
        </div>
        Stimme zu
      </div>
    </div>

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
import useGraphql from '~/composables/useGraphql'
import useNotifications from '~/composables/useNotifications'
import useConfirmationDialog from '~/composables/useConfirmationDialog'
import useFeedback, { Raeson } from '~/composables/useFeedback'
import { Statement } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    Stepper,
    AppButton
  },
  props: {
    statement: {
      type: Object as PropType<Statement>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', props.statement.arguments.length > 0 ? 3 : 2)

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
              opinionable_id: props.statement.id,
              opinionable_type: 'App\\Models\\Statement',
              position: result
            }
          }
        },
        fields: ['id']
      }

      const q = mutation(operation)
      const { upsertOpinion } = await client.mutation(q.query, q.variables)

      if (upsertOpinion) {
        router.push(`/statement/${props.statement.id}/voting`)
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

        const created = await createFeedback(reason, props.proposal.id, 'App\\Models\\Proposal', 4)

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
.proposal-container {
  height: calc(100% - 104px);

  h2 {
    font-size: 20px;
    font-weight: 500;
    @apply pt-2 mb-4;
  }

  .action-buttons {
    padding: 10px 0;
    @apply grid grid-cols-3 text-center sticky bg-white w-full bottom-0;

    .btn {
      border: 2px solid #dcdcdc;
      width: 60px;
      height: 60px;
      @apply rounded-full mx-auto cursor-pointer select-none outline-none;

      .material-icons {
        line-height: 56px;
        font-size: 40px;

        &.red {
          color: #f93a3a;
        }

        &.gray {
          color: #4d4d4d;
        }

        &.green {
          color: #00ec89;
        }
      }
    }
  }
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
