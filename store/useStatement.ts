import { query } from 'gql-query-builder'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { readonly, ref } from '@nuxtjs/composition-api'
import { Statement } from '~/@types/graphql-types'
import useGraphql from '~/composables/useGraphql'

const currentStatement = ref<Statement>()
export default function useStatement() {
  const client = useGraphql()

  async function loadStatement(id: number, force = false) {
    if (!force && currentStatement.value?.id === id) {
      return
    }

    const operation: IQueryBuilderOptions = {
      operation: 'statement',
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
        'source_of_explanation',
        { arguments: ['id', 'statement', 'source'] },
        { topic: ['title', 'icon'] }
      ]
    }

    const q = query(operation)
    const { statement: response } = await client.query(q.query, q.variables)
    if (response) {
      currentStatement.value = response
    }
  }

  return {
    loadStatement,
    currentStatement: readonly(currentStatement)
  }
}
