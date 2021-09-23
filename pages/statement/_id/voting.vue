<template>
  <div>
    <p class="short-statement px-4">{{ proposal.short_statement }}</p>

    <div class="px-4 my-2" v-for="(res, i) in results" :key="i">
      <VotingResult :header="res.header" :results="res.results" />
    </div>

    <AppButton small class="forward-btn" icon="arrow_forward" @click="$router.push('/profile/political')">
      Zum Matching
    </AppButton>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { query } from 'gql-query-builder'
import { uniqBy } from 'lodash'
import AppButton from '~/components/Button.vue'
import useGraphql from '~/composables/useGraphql'
import { Party, Proposal, Voting, VotingOutcome } from '~/@types/graphql-types'
import { VotingResult } from '~/components/VotingResult.vue'

interface Result {
  header: string
  subtitle: string
  results: VotingResult[]
}

export default defineComponent({
  components: {
    AppButton
  },
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', 4)

    const client = useGraphql()

    const voting = ref({} as Voting)
    const parties = ref<Party[]>([])
    const results = ref<Result[]>([])

    useFetch(async () => {
      const operations: IQueryBuilderOptions = {
        operation: 'chamberVoting',
        variables: {
          proposal_id: {
            required: true,
            value: props.proposal.id
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

        results.value = []
        parties.value.forEach((party) => {
          const childVotings = voting.value.childVotings.filter((v) => v.party!.id === party.id)
          results.value.push({
            header: party.name,
            subtitle: party.name,
            results: [
              {
                label: 'Ja',
                color: '#00EA8E',
                value: props.proposal.inverted
                  ? childVotings.find((v) => v.outcome === VotingOutcome.No)!.count!
                  : childVotings.find((v) => v.outcome === VotingOutcome.Yes)!.count!
              },
              {
                label: 'Nein',
                color: '#FF3440',
                value: props.proposal.inverted
                  ? childVotings.find((v) => v.outcome === VotingOutcome.Yes)!.count!
                  : childVotings.find((v) => v.outcome === VotingOutcome.No)!.count!
              },
              {
                label: 'Enthalten',
                color: '#FFCA33',
                value: childVotings.find((v) => v.outcome === VotingOutcome.Abstained)!.count!
              },
              {
                label: 'Abwesend',
                color: '#c4c4c4',
                value: childVotings.find((v) => v.outcome === VotingOutcome.Absent)!.count!
              }
            ]
          })
        })
      }
    })

    return {
      results
    }
  }
})
</script>

<style lang="scss" scoped>
.short-statement {
  font-size: 20px;
  font-weight: 500;
  @apply pt-2;
}

h2 {
  @apply font-bold;
}

.forward-btn {
  bottom: 10px;
  left: calc(50% - 61px);

  @apply absolute;
}
</style>
