import { query } from 'gql-query-builder'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { readonly, ref } from '@nuxtjs/composition-api'
import { Proposal } from '~/@types/graphql-types'
import useGraphql from '~/composables/useGraphql'

const proposalOfTheDay = ref<Proposal>()
const currentProposal = ref<Proposal>()
export default function useProposals () {
  const client = useGraphql()

  async function loadProposalOfTheDay () {
    const operation: IQueryBuilderOptions = {
      operation: 'proposalOfTheDay',
      fields: [
        'id', 'title', 'statement', 'explanation', 'short_statement', 'source_of_proposal', 'source_of_explanation', 'color',
        { arguments: ['id', 'statement', 'source'] }
      ]
    }

    const q = query(operation)
    const { proposalOfTheDay: response } = await client.query(q.query, q.variables)
    if (response) {
      proposalOfTheDay.value = response
    }
  }

  async function loadProposal (id: number, force = false) {
    if (!force && currentProposal.value?.id === id) {
      return
    }

    const operation: IQueryBuilderOptions = {
      operation: 'proposal',
      variables: {
        id: {
          required: true,
          value: id
        }
      },
      fields: [
        'id', 'title', 'statement', 'short_statement', 'explanation', 'source_of_proposal', 'source_of_explanation', 'color',
        { arguments: ['id', 'statement', 'source'] },
        { latest_voting: ['carried_out_at'] }
      ]
    }

    const q = query(operation)
    const { proposal: response } = await client.query(q.query, q.variables)
    if (response) {
      currentProposal.value = response
    }
  }

  return {
    loadProposalOfTheDay,
    loadProposal,
    currentProposal: readonly(currentProposal),
    proposalOfTheDay
  }
}
