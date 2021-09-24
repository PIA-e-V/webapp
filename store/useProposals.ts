import { query } from 'gql-query-builder'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { readonly, ref } from '@nuxtjs/composition-api'
import { Proposal } from '~/@types/graphql-types'
import useGraphql from '~/composables/useGraphql'

const currentProposal = ref<Proposal>()
export default function useProposals() {
  const client = useGraphql()

  async function loadProposal(id: number, force = false) {
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
        'id',
        'title',
        'statement',
        'short_statement',
        'explanation',
        'source_of_proposal',
        'source_of_explanation',
        'color',
        'inverted',
        { arguments: ['id', 'statement', 'source'] },
        { latest_voting: ['carried_out_at'] },
        { topic: ['icon'] }
      ]
    }

    const q = query(operation)
    const { proposal: response } = await client.query(q.query, q.variables)
    if (response) {
      currentProposal.value = response
    }
  }

  return {
    loadProposal,
    currentProposal: readonly(currentProposal)
  }
}
