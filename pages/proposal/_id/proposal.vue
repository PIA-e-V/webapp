<template>
  <div class="proposal-container">
    <div class="px-4 h-full overflow-scroll flex flex-col">
      <h2>Was ist deine Meinung zu dem Antrag?</h2>

      <StatementCard :item="proposal" />

      <!--      <DecisionCard-->
      <!--        :value="proposal.statement"-->
      <!--        :decisions="[-->
      <!--          { label: 'Dagegen', result: 'DISAGREE', icon: 'close' },-->
      <!--          { label: 'Neutral', result: 'NEUTRAL', icon: 'thumbs_up_down' },-->
      <!--          { label: 'Dafür', result: 'AGREE', icon: 'favorite' }-->
      <!--        ]"-->
      <!--        @decision="save"-->
      <!--      />-->
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn">
          <span class="material-icons red">close</span>
        </div>
        Ablehnen
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
        Zustimmen
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import useGraphql from '~/composables/useGraphql'
import { Proposal } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    Stepper,
    AppButton
  },
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', 3)

    const router = useRouter()
    const client = useGraphql()

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
        router.push(`/proposal/${props.proposal.id}/voting`)
      } else {
        console.log('Alarm')
      }
    }

    return {
      save
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
</style>
