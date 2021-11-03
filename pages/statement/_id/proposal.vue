<template>
  <div class="proposal-container">
    <div class="px-4 h-full overflow-scroll flex flex-col">
      <h2 class="pt-2 mb-4">Was ist deine Meinung zu dem Antrag?</h2>

      <StatementCard :item="statement" />
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn">
          <img src="/icons/arguments/oppose.svg" alt="Ablehnen" />
        </div>
        Ablehnen
      </div>
      <div @click="save('NEUTRAL')">
        <div class="btn">
          <img src="/icons/arguments/neutral.svg" alt="Neutral" />
        </div>
        Neutral
      </div>
      <div @click="save('AGREE')">
        <div class="btn">
          <img src="/icons/arguments/agree.svg" alt="Zustimmen" />
        </div>
        Zustimmen
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import useGraphql from '~/composables/useGraphql'
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
      save
    }
  }
})
</script>

<style lang="scss" scoped>
.proposal-container {
  height: calc(100% - 104px);

  .action-buttons {
    padding: 10px 0;
    @apply grid grid-cols-3 text-center sticky bg-white w-full bottom-0;

    .btn {
      border: 2px solid #dcdcdc;
      width: 60px;
      height: 60px;
      @apply rounded-full mx-auto cursor-pointer select-none outline-none;

      img {
        transform: scale(0.55);
        @apply w-full h-full;
      }
    }
  }
}
</style>
