<template>
  <div>
    <header>
      <BackButton path="/" />

      <h1>Statements</h1>
      <div v-if="$route.params.status === 'open'">Offene Statements die du noch nicht bearbeitet hast.</div>
      <div v-else>Abgeschlossene Statements die du bereits bearbeitet hast.</div>
    </header>

    <div v-for="topic in topics" :key="topic.id">
      <h2 class="pl-6 pt-6 font-bold">
        <span class="material-icons">{{ topic.icon }}</span>
        <span class="inline-block" style="transform: translateY(-6px)">- {{ topic.title }}</span>
      </h2>

      <section class="statements">
        <ProposalCard
          v-for="proposal in proposals.filter((p) => p.topic.id === topic.id)"
          :key="proposal.id"
          :value="proposal"
          hide-topic
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { query } from 'gql-query-builder'
import useGraphql from '~/composables/useGraphql'
import { Proposal, Topic } from '~/@types/graphql-types'

export default defineComponent({
  setup() {
    const client = useGraphql()
    const route = useRoute()

    const proposals = ref<Proposal[]>([])
    const topics = ref<Topic[]>([])

    const { fetchState } = useFetch(async () => {
      const proposalFields = [
        'id',
        'title',
        'statement',
        'short_statement',
        'explanation',
        'source_of_proposal',
        'source_of_explanation',
        'color',
        { arguments: ['id', 'statement', 'source'] },
        { topic: ['id', 'title', 'icon'] }
      ]

      const operation: IQueryBuilderOptions = {
        operation: 'me',
        fields: ['statement_progress']
      }

      operation.fields!.push(
        route.value.params.status === 'open' ? { openProposals: proposalFields } : { doneProposals: proposalFields }
      )

      const q = query(operation)
      const { me: meResponse } = await client.query(q.query, q.variables)

      if (meResponse) {
        proposals.value = meResponse.openProposals ? meResponse.openProposals : meResponse.doneProposals

        topics.value = proposals.value
          .map((proposal) => proposal.topic)
          .filter((value, index, self) => self.findIndex((t) => t.id === value.id) === index)
      }
    })

    return {
      proposals,
      fetchState,
      topics
    }
  }
})
</script>
<style lang="scss" scoped>
header {
  height: 150px;
  background: #3a4090;

  @apply relative;

  h1 {
    color: white;
    font-size: 20pt;
    font-family: 'Bree Serif';

    @apply pt-8 font-bold text-center;
  }

  div {
    color: white;

    @apply text-center font-light px-3;
  }
}

.statements {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  scrollbar-width: none; /* Firefox */
}

.statements::-webkit-scrollbar {
  display: none;
}
</style>
