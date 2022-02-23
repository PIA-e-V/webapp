<template>
  <div v-if="proposal" class="proposal-container">
    <div class="px-4 h-full overflow-scroll flex flex-col">
      <div class="flex pt-2 mb-3">
        <div class="pr-2"><span class="underline text-black cursor-pointer" @click="back">&lt;</span></div>
        <h2 class="flex flex-col flex-grow">Wat is jouw mening?</h2>
      </div>

      <div style="max-width: min(100%, 600px)">
        <span class="bold">{{ current }} / {{ total }}</span>
        <div class="progress">
          <div class="progress-inner" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <StatementCard :item="proposal" />
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn">
          <img src="/icons/arguments/oppose.svg" alt="Ablehnen" />
        </div>
        Daling
      </div>
      <div @click="save('NEUTRAL')">
        <div class="btn">
          <img src="/icons/arguments/neutral.svg" alt="Neutral" />
        </div>
        Neutraal
      </div>
      <div @click="save('AGREE')">
        <div class="btn">
          <img src="/icons/arguments/agree.svg" alt="Zustimmen" />
        </div>
        Mee eens
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, useRouter, watchEffect } from '@nuxtjs/composition-api'
import useGraphql from '~/composables/useGraphql'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation, query } from 'gql-query-builder'
import { Proposal } from '~/@types/graphql-types'

export default defineComponent({
  layout: 'minimal',
  setup() {
    const client = useGraphql()
    const router = useRouter()

    const proposals = ref<Proposal[]>([])
    const currentIndex = ref(0)
    const proposal = computed<Proposal | null>(() =>
      proposals.value.length > 0 ? proposals.value[currentIndex.value] : null
    )

    onBeforeMount(async () => {
      const cacheIndex = localStorage.getItem('widget-index')
      if (cacheIndex) {
        currentIndex.value = parseInt(cacheIndex)
      }

      watchEffect(() => {
        localStorage.setItem('widget-index', currentIndex.value.toString())
      })

      const operation: IQueryBuilderOptions = {
        operation: 'proposals',
        variables: { first: 200 },
        fields: [
          {
            data: [
              '__typename',
              'id',
              'title',
              'statement',
              'short_statement',
              'explanation',
              'source_of_proposal',
              'source_of_explanation',
              'color',
              'inverted',
              { latest_voting: ['carried_out_at'] },
              { topic: ['icon'] },
              { disclaimer: ['short_text', 'long_text'] }
            ]
          }
        ]
      }

      const q = query(operation)
      const { proposals: response } = await client.query(q.query, q.variables)
      if (response) {
        proposals.value = response.data
      }
    })

    async function save(result: string) {
      const operation: IQueryBuilderOptions = {
        operation: 'upsertOpinion',
        variables: {
          input: {
            type: 'UpsertOpinionInput',
            required: true,
            value: {
              opinionable_id: proposal.value!.id,
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
        let newIndex = currentIndex.value + 1
        if (newIndex > proposals.value.length - 1) {
          router.push('/widget/scores')
          return
        }
        currentIndex.value = newIndex
      } else {
        console.log('error')
      }
    }

    return {
      save,
      proposal,
      progress: computed(() => (100 / proposals.value.length) * currentIndex.value),
      current: computed(() => currentIndex.value + 1),
      total: computed(() => proposals.value.length),
      back() {
        currentIndex.value = currentIndex.value - 1
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

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

.progress {
  @apply flex flex-row rounded-full my-2;
  height: 5px;
  border: 1px solid $medium-grey;

  .progress-inner {
    @apply h-full;
    background: $primary;
    transition: width 0.3s;
  }
}
</style>
