<template>
  <div class="flex-grow mx-auto" style="max-width: min(100%, 600px)">
    <header class="text-center">
      <div class="description">Jouw resultaat voor de</div>
      <h2 class="font-normal">Gemeenteraadsverkiezingen <span style="color: #f76b30">Sliedrecht</span></h2>
    </header>

    <p v-if="fetchState.pending" class="text-center pt-10">Resultaten laden ...</p>
    <div v-else-if="partyScores.length === 0" class="text-center pt-10 px-4">
      <p class="font-bold pb-4">Beantwoord vragen om een resultaat te krijgen</p>
    </div>

    <div v-if="!fetchState.pending" class="mx-4">
      <section id="capture" class="mt-5 pt-2 mx-auto box">
        <div v-for="(score, i) in scores" class="mb-4" :key="i">
          <div class="flex mb-2">
            <div class="box">{{ score.party.name }}</div>

            <div class="flex-grow" />

            <div class="box">{{ score.totalScore }}%</div>
          </div>
          <div class="progress">
            <div :style="{ width: `${score.totalScore}%` }"></div>
          </div>
        </div>
      </section>
    </div>

    <div v-if="!fetchState.pending" class="mx-4 mt-2">
      <div class="flex">
        <div class="flex">
          <Button class="mr-2" icon="arrow_back" small @click="back" />
          <span style="line-height: 2">Terug naar vragen</span>
        </div>

        <div class="flex-grow"></div>

        <div class="flex">
          <span style="line-height: 2">Klaar!</span>
          <Button class="ml-2" icon="arrow_forward" small @click="forward" />
        </div>
      </div>
    </div>

    <!--    <h1 v-show="!fetchState.pending && partyScores.length > 0" class="pl-4 mt-5">Gewichtung</h1>-->
    <!--    <section v-show="fetchState.timestamp" id="weightings">-->
    <!--      <div v-for="topic in topics" :key="topic.id">-->
    <!--        <h2>{{ topic.title }}</h2>-->
    <!--        <input-->
    <!--          :id="`topic-weight-${topic.id}`"-->
    <!--          type="range"-->
    <!--          min="0"-->
    <!--          max="100"-->
    <!--          value="100"-->
    <!--          @change="weightChanged(topic)"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </section>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, useFetch, useRouter } from '@nuxtjs/composition-api'
import { query } from 'gql-query-builder'
import useGraphql from '~/composables/useGraphql'
import { Party, ScoreResult, Topic } from '~/@types/graphql-types'

export default defineComponent({
  setup() {
    const client = useGraphql()
    const router = useRouter()

    const topics = ref<Topic[]>([])
    const partyScores = ref<ScoreResult[]>([])
    const matchCount = ref(0)

    const { fetchState } = useFetch(async () => {
      const q = query([
        {
          operation: 'partyScores',
          fields: [
            'score',
            { party: ['id', 'name', 'color'] },
            { topics: [{ topic: ['id', 'title', 'icon'] }, 'score'] }
          ]
        }
      ])
      const { partyScores: scoreResponse } = await client.query(q.query, q.variables)

      if (scoreResponse) {
        partyScores.value = scoreResponse
        topics.value = scoreResponse.map((s) => s.topics.map((t) => t.topic))[0]
      }

      await nextTick()

      updateCalculation()
    })

    const scores = ref<Array<{ totalScore: number; party: Party }>>([])
    function updateCalculation() {
      scores.value = []
      partyScores.value.forEach((score) => {
        // const totalScore = (sum(score.topics.map(s => s.score)) / score.topics.length).toPrecision(2)
        let totalScore = 0
        score.topics.forEach((t) => {
          totalScore += t.score
        })
        totalScore = Math.round((totalScore / score.topics.length) * 100)

        scores.value.push({
          totalScore,
          party: score.party
        })
      })
    }

    return {
      topics,
      partyScores,
      scores,
      fetchState,
      matchCount,
      weightChanged() {
        updateCalculation()
      },
      back() {
        // localStorage.setItem('widget-index', '0')
        router.push('/widget/statements')
      },
      forward() {
        router.push('/widget/thanks')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

header {
  @apply px-4;

  h1 {
    font-size: 20pt;

    @apply pt-4;
  }

  .description {
    line-height: 19px;

    @apply font-light;
  }
}

.progress {
  height: 10px;
  border-radius: 10px;
  border: 1px solid gray;
  @apply overflow-hidden mb-1;

  & > div {
    background: $primary;
    transition: width 0.5s;
    border-radius: 10px;
    width: 0;
    height: 8px;
  }
}

#weightings {
  @apply px-5 pb-5;

  input[type='range'] {
    -webkit-appearance: none;
    height: 10px;
    border-radius: 10px;
    background: #b7b8be;
    @apply w-full outline-none;

    $size: 20px;

    &::-webkit-slider-thumb {
      width: $size;
      height: $size;
      border-radius: 50%;
      background: $primary;
      @apply cursor-pointer appearance-none;
    }

    &::-moz-range-thumb {
      width: $size;
      height: $size;
      border-radius: 50%;
      background: $primary;
      @apply cursor-pointer;
    }
  }
}

.box {
  border: 1px solid lightgray;
  @apply rounded-xl px-2;
}
</style>
