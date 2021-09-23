<template>
  <div>
    <header>
      <h1>Parteinähe</h1>
      <div class="description">
        Hier siehst du, welche Partei deiner Meinung am nächsten steht. Dein Profil wurde auf Basis von {{ matchCount }}
        Abstimmungen erstellt. Je öfter du abstimmst, desto genauer wird es.
      </div>
    </header>

    <h2 v-if="fetchState.pending" class="text-center pt-5">Lade Profildaten ...</h2>
    <h2 v-else-if="partyScores.length === 0" class="text-center pt-5 px-4">
      <span class="font-bold">Ups...</span><br /><br />

      Du hast noch keine Statements beantwortet. Beantworte Statements bevor du dein politisches Profil sehen kannst.<br /><br />

      <nuxt-link to="/statements/open"> <span class="font-bold underline">Klicke hier</span> </nuxt-link>, um dir ein
      Statement auszusuchen.
    </h2>

    <section id="capture" class="px-2 pb-4 mt-5 grid grid-cols-3 sm:grid-cols-3 auto-rows-fr mx-auto">
      <div v-for="(score, i) in partyScores" :key="score.party.id">
        <div class="text-center font-bold">#{{ i + 1 }} - {{ score.party.name }}</div>
        <div :id="`chart-${score.party.id}`" />
      </div>
    </section>

    <h1 v-show="!fetchState.pending" class="pl-6 mb-2">Gewichtung</h1>
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
import ApexCharts, { ApexOptions } from 'apexcharts'
import { query } from 'gql-query-builder'
import useGraphql from '~/composables/useGraphql'
import { ScoreResult, Topic } from '~/@types/graphql-types'

export default defineComponent({
  setup() {
    const client = useGraphql()

    const topics = ref<Topic[]>([])
    const partyScores = ref<ScoreResult[]>([])
    const matchCount = ref(0)

    const charts = new Map<number, ApexCharts>()

    const { fetchState } = useFetch(async () => {
      const q = query([
        {
          operation: 'partyScores',
          fields: [
            'score',
            { party: ['id', 'name', 'color'] },
            { topics: [{ topic: ['id', 'title', 'icon'] }, 'score'] }
          ]
        },
        {
          operation: 'me',
          fields: [{ doneProposals: ['id'] }]
        }
      ])
      const { partyScores: scoreResponse, me: meResponse } = await client.query(q.query, q.variables)

      if (scoreResponse) {
        partyScores.value = scoreResponse
        topics.value = scoreResponse.map((s) => s.topics.map((t) => t.topic))[0]
      }
      if (meResponse) {
        matchCount.value = meResponse.doneProposals.length
      }

      await nextTick()

      renderCharts()
    })

    function renderCharts() {
      const generalOptions: ApexOptions = {
        chart: { type: 'radialBar', width: '100%' },
        grid: { padding: { top: 0, right: 0, bottom: 0, left: 0 } },
        plotOptions: {
          radialBar: {
            hollow: { size: '40%' },
            dataLabels: {
              show: true,
              name: { show: false },
              value: { show: true, color: '#111', offsetY: 5 }
            }
          }
        }
      }

      partyScores.value.forEach((score) => {
        // const totalScore = (sum(score.topics.map(s => s.score)) / score.topics.length).toPrecision(2)
        let totalScore = 0
        score.topics.forEach((t) => {
          const element = document.querySelector(`#topic-weight-${t.topic.id}`) as HTMLInputElement
          totalScore += (t.score * parseInt(element.value)) / 100
        })
        totalScore = Math.round((totalScore / score.topics.length) * 100)

        if (!charts.has(score.party.id)) {
          const chart = new ApexCharts(document.querySelector(`#chart-${score.party.id}`), {
            ...generalOptions,
            series: [totalScore],
            labels: [score.party.name],
            colors: [score.party.color]
          })
          chart.render()
          charts.set(score.party.id, chart)
        } else {
          charts.get(score.party.id)!.updateSeries([totalScore])
        }
      })
    }

    return {
      topics,
      partyScores,
      fetchState,
      matchCount,
      weightChanged() {
        renderCharts()
      },
      async share() {
        const canvas = await html2canvas(document.querySelector('#capture')!)

        console.log(canvas.toDataURL('image/jpeg', 0.95))

        if (navigator.share) {
          const base64url = canvas.toDataURL('image/jpeg', 0.95)
          const blob = await (await fetch(base64url)).blob()
          const file = new File([blob], 'profile.jpg', { type: blob.type })

          const shareData = {
            // title: 'Mein politisches Profil',
            // text: 'Guck Dir mein politisches Profil auf FollowTheVote an!',
            files: [file]
          }
          // @ts-ignore
          // if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            // @ts-ignore
            await navigator.share(shareData)
          } catch {
            console.error('could not share share profile')
          }
          // } else {
          //   // @ts-ignore
          //   shareData.url = base64url
          //   // @ts-ignore
          //   delete shareData.files
          //   await navigator.share(shareData)
          // }
        }
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

#share-btn {
  right: 20px;
  bottom: 60px;

  @apply absolute;
}

#weightings {
  @apply px-8 pb-12;
}

#weightings input[type='range'] {
  @apply w-full;
}
</style>
