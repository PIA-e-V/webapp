<template>
  <div v-if="proposal" class="proposal-container">
    <div class="px-4 h-full overflow-scroll flex flex-col">
      <div class="flex pt-2 mb-3">
        <div class="flex flex-col flex-grow">
          <img src="/logo-sliedrecht.svg" style="height: 50px" class="my-2" alt="Het Kompas Logo" />
        </div>
      </div>

      <div class="w-full flex mx-auto" style="max-width: min(100%, 600px)">
        <Button :disabled="currentIndex <= 0" class="mr-4 back-btn" icon="arrow_back" small @click="back" />
        <div class="flex-grow mx-auto">
          <div class="box text-center">{{ current }}/{{ total }} vragen beantwoord</div>
        </div>
        <Button class="ml-4 back-btn" icon="arrow_forward" small @click="forward" />
      </div>
      <div class="w-full flex mx-auto" style="max-width: min(100%, 600px)">
        <div class="progress w-full">
          <div class="progress-inner" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <StatementCard :item="proposal" />
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn" :class="{ active: myOpinion && myOpinion.position === 'DISAGREE' }">
          <img
            v-if="myOpinion && myOpinion.position === 'DISAGREE'"
            src="/icons/arguments/oppose_white.svg"
            alt="Oneens"
          />
          <img v-else src="/icons/arguments/oppose.svg" alt="Oneens" />
        </div>
        Oneens
      </div>
      <div @click="save('NEUTRAL')">
        <div class="btn" :class="{ active: myOpinion && myOpinion.position === 'NEUTRAL' }">
          <img
            v-if="myOpinion && myOpinion.position === 'NEUTRAL'"
            src="/icons/arguments/neutral_white.svg"
            alt="Neutraal"
          />
          <img v-else src="/icons/arguments/neutral.svg" alt="Neutraal" />
        </div>
        Neutraal
      </div>
      <div @click="save('AGREE')">
        <div class="btn" :class="{ active: myOpinion && myOpinion.position === 'AGREE' }">
          <img
            v-if="myOpinion && myOpinion.position === 'AGREE'"
            src="/icons/arguments/agree_white.svg"
            alt="Mee eens"
          />
          <img v-else src="/icons/arguments/agree.svg" alt="Mee eens" />
        </div>
        Mee eens
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, useRouter, watch, watchEffect } from '@nuxtjs/composition-api'
import useGraphql from '~/composables/useGraphql'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import { Opinion, Proposal } from '~/@types/graphql-types'

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
    const myOpinion = ref<Opinion>()

    async function loadOpinion(id: number) {
      const { myOpinion: response } = await client.query(`query {
          myOpinion(opinionable_id: ${id}, opinionable_type: "App\\\\Models\\\\Proposal") {
            position
          }
        }`)
      if (response) {
        myOpinion.value = response
      }
    }

    onBeforeMount(async () => {
      const { proposals: response } = await client.query(`query {
        proposals(first: 200, where: { column: ACTIVE, operator: EQ, value: true }) {
          data {
            __typename
            id title statement short_statement
            source_of_proposal source_of_explanation inverted
            latest_voting { carried_out_at }
            topic { icon title }
          }
        }
      }`)
      if (response) {
        proposals.value = response.data
      }

      const cacheIndex = localStorage.getItem('widget-index')
      if (cacheIndex) {
        let index = parseInt(cacheIndex)
        if (index > proposals.value.length) {
          index = 0
        }

        currentIndex.value = index

        loadOpinion(proposal.value!.id)
      }

      watch([currentIndex], () => {
        localStorage.setItem('widget-index', currentIndex.value.toString())

        loadOpinion(proposal.value!.id)
      })
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
        myOpinion.value = undefined
      } else {
        console.log('error')
      }
    }

    return {
      save,
      proposal,
      currentIndex,
      myOpinion,
      progress: computed(() => (100 / proposals.value.length) * currentIndex.value),
      current: computed(() => currentIndex.value + 1),
      total: computed(() => proposals.value.length),
      back() {
        if (currentIndex.value <= 0) {
          return
        }

        currentIndex.value = currentIndex.value - 1
        myOpinion.value = undefined
      },
      forward() {
        if (currentIndex.value >= proposals.value.length - 1) {
          router.push('/widget/scores')
          return
        }

        currentIndex.value = currentIndex.value + 1
        myOpinion.value = undefined
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

      &.active {
        background: $primary;
      }

      img {
        transform: scale(0.55);
        @apply w-full h-full;
      }
    }
  }
}

.progress {
  @apply flex flex-row rounded-full my-2 shadow;
  height: 10px;
  border: 1px solid lightgray;

  .progress-inner {
    @apply h-full rounded-full;
    background: $primary;
    transition: width 0.3s;
  }
}

.box {
  border: 1px solid lightgray;
  @apply rounded-xl px-2 py-1;
}
</style>
