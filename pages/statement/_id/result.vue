<template>
  <div>
    <header>
      <BackButton />

      <h1>Parteipositionen</h1>
      <div class="short-statement">
        <span v-if="!fetchState.pending">{{ proposal.short_statement }}</span>
      </div>
    </header>

    <div class="px-4">
      <Stepper :step="5" />

      <div id="charts">
        <section v-for="p in parties" :key="p.id">
          <div :id="`chart-${p.id}`" />
          <h2 class="text-center">
            {{ p.name }}
          </h2>
        </section>
      </div>
    </div>

    <div v-if="parties.length > 0" id="legend" style="line-height: 20px">
      <span style="background: #26e291" class="rounded-full inline-block" /> Ja &nbsp;
      <span style="background: #fa6751" class="rounded-full inline-block" /> Nein &nbsp;
      <span style="background: #343e94" class="rounded-full inline-block" /> Enthalten &nbsp;
      <span style="background: #575a6d" class="rounded-full inline-block" /> Abwesend
    </div>

    <AppButton class="forward-btn" icon="arrow_forward" @click="$router.push('/profile')"> Zum Matching </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch, nextTick, useRoute } from '@nuxtjs/composition-api'
import ApexCharts, { ApexOptions } from 'apexcharts'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { query } from 'gql-query-builder'
import { uniqBy } from 'lodash'
import AppButton from '~/components/Button.vue'
import useProposals from '~/store/useProposals'
import useGraphql from '~/composables/useGraphql'
import { Party, Voting, VotingOutcome } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    AppButton
  },
  setup() {
    const route = useRoute()
    const { currentProposal: proposal, loadProposal } = useProposals()
    const client = useGraphql()

    const voting = ref({} as Voting)
    const parties = ref<Party[]>([])

    const { fetchState } = useFetch(async () => {
      const id = parseInt(route.value.params.id)
      await loadProposal(id)

      const operations: IQueryBuilderOptions = {
        operation: 'chamberVoting',
        variables: {
          proposal_id: {
            required: true,
            value: proposal.value!.id
          },
          chamber_id: {
            required: true,
            value: 1
          }
        },
        fields: [{ childVotings: ['id', 'outcome', { party: ['id', 'name'] }, 'count'] }, 'outcome']
      }

      const q = query(operations)

      const { chamberVoting: chamberVotingResponse } = await client.query(q.query, q.variables)

      if (chamberVotingResponse) {
        voting.value = chamberVotingResponse
        parties.value = uniqBy(
          voting.value.childVotings.map((v) => ({
            id: v.party!.id,
            name: v.party!.name
          })),
          'id'
        ) as Party[]

        await nextTick()

        renderCharts()
      }
    })

    //  setTimeout(renderCharts, 6000)

    function renderCharts() {
      parties.value.forEach((party) => {
        const childVotings = voting.value.childVotings.filter((v) => v.party!.id === party.id)
        const options: ApexOptions = {
          series: [
            proposal.value!.inverted
              ? childVotings.find((v) => v.outcome === VotingOutcome.No)!.count!
              : childVotings.find((v) => v.outcome === VotingOutcome.Yes)!.count!,
            proposal.value!.inverted
              ? childVotings.find((v) => v.outcome === VotingOutcome.Yes)!.count!
              : childVotings.find((v) => v.outcome === VotingOutcome.No)!.count!,
            childVotings.find((v) => v.outcome === VotingOutcome.Abstained)!.count!,
            childVotings.find((v) => v.outcome === VotingOutcome.Absent)!.count!
          ],
          labels: ['Ja', 'Nein', 'Enthalten', 'Abwesend'],
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          colors: ['#26E291', '#FA6751', '#343E94', '#575A6D'],
          chart: {
            type: 'donut'
          }
        }
        new ApexCharts(document.querySelector(`#chart-${party.id}`), options).render()
      })
    }

    return {
      fetchState,
      parties,
      proposal
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

h2 {
  @apply font-bold;
}

.forward-btn {
  bottom: 60px;
  left: calc(50% - 75px);

  @apply absolute;
}

#charts {
  @apply grid auto-rows-auto grid-cols-3 mt-8 row-gap-2 mx-auto;
}

#legend {
  @apply col-span-3 text-center mt-5;
}

#legend span {
  width: 12px;
  height: 12px;
}
</style>
