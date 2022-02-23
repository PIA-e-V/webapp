<template>
  <div class="flex-grow">
    <header v-if="!fetchState.pending && partyScores.length > 0">
      <h1>Parteinähe</h1>
      <div class="description">Hier siehst du, welche Partei deiner Meinung am nächsten steht.</div>
    </header>

    <p v-if="fetchState.pending" class="text-center pt-10">Lade Ergebnisse ...</p>
    <div v-else-if="partyScores.length === 0" class="text-center pt-10 px-4">
      <p class="font-bold pb-4">Noch nichts da...</p>
    </div>

    <section id="capture" class="mt-5 mx-auto">
      <div v-for="(score, i) in scores" :key="i">
        <div>
          #{{ i + 1 }} - {{ score.party.name }} <span class="float-right">{{ score.totalScore }}%</span>
        </div>
        <div class="progress">
          <div :style="{ width: `${score.totalScore}%`, background: score.party.color }"></div>
        </div>
      </div>
    </section>

    <h1 v-show="!fetchState.pending && partyScores.length > 0" class="pl-4 mt-5">Gewichtung</h1>
    <section v-show="fetchState.timestamp" id="weightings">
      <div v-for="topic in topics" :key="topic.id">
        <h2>{{ topic.title }}</h2>
        <input
          :id="`topic-weight-${topic.id}`"
          type="range"
          min="0"
          max="100"
          value="100"
          @change="weightChanged(topic)"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, useFetch } from '@nuxtjs/composition-api'
import html2canvas from 'html2canvas'
import { query } from 'gql-query-builder'
import useGraphql from '~/composables/useGraphql'
import { Party, ScoreResult, Topic } from '~/@types/graphql-types'

export default defineComponent({
  setup() {
    const client = useGraphql()

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
          const element = document.querySelector(`#topic-weight-${t.topic.id}`) as HTMLInputElement
          totalScore += (t.score * parseInt(element.value)) / 100
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
    transition: width 0.5s;
    width: 0;
    height: 10px;
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
</style>
