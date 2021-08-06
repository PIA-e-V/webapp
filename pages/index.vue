<template>
  <div>
    <div id="header">
      <img id="logo" src="/logo.png" alt="Logo">
    </div>

    <UserProgress :value="progress" />

    <MegaButton title="Statement" sup-title="Checke dein heutiges" @click="clicked" />

    <h1 class="pl-6 pt-4" style="font-size: 18pt; font-family: 'Bree Serif',serif; font-weight: 500;">
      Statements
    </h1>

    <h2 class="pl-6 pt-3 font-bold" style="line-height: 30px;">
      Offen

      <Button
        v-if="fetchState.timestamp && openProposals.length > 0"
        class="see-all-btn"
        icon="arrow_forward"
        background="white"
        color="#3A4090"
        small
        @click="$router.push('/statements/open')"
      >
        Übersicht
      </Button>
    </h2>
    <h3 v-show="fetchState.pending" class="pl-6 pt-6">
      Lade Statements ...
    </h3>
    <h3 v-show="fetchState.timestamp && openProposals.length === 0" class="pl-6 pt-6">
      Keine offenen Statements verfügbar
    </h3>
    <section class="statements">
      <ProposalCard v-for="proposal in openProposals" :key="proposal.id" :value="proposal" />
    </section>

    <h2 class="pl-6 pt-3 font-bold" style="line-height: 30px;">
      Erledigt

      <Button
        v-if="fetchState.timestamp && doneProposals.length > 0"
        class="float-right see-all-btn"
        icon="arrow_forward"
        background="white"
        color="#3A4090"
        small
        @click="$router.push('/statements/done')"
      >
        Übersicht
      </Button>
    </h2>
    <h3 v-show="fetchState.pending" class="pl-6 pt-6">
      Lade Statements ...
    </h3>
    <h3 v-show="fetchState.timestamp && doneProposals.length === 0" class="pl-6 pt-6">
      Bisher keine Statements abgeschlossen
    </h3>
    <section class="statements">
      <ProposalCard v-for="proposal in doneProposals" :key="proposal.id" :value="proposal" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useFetch, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { query } from 'gql-query-builder'
import UserProgress from '~/components/UserProgress.vue'
import MegaButton from '~/components/MegaButton.vue'
import ProposalCard from '~/components/ProposalCard.vue'
import useProposals from '~/store/useProposals'
import useGraphql from '~/composables/useGraphql'
import { Proposal } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    UserProgress,
    MegaButton,
    ProposalCard
  },
  setup () {
    const router = useRouter()
    const { loadProposalOfTheDay, proposalOfTheDay } = useProposals()
    const client = useGraphql()

    const progress = ref(0)
    const openProposals = ref<Proposal[]>([])
    const doneProposals = ref<Proposal[]>([])

    if (localStorage.getItem('user-progress')) {
      progress.value = parseInt(localStorage.getItem('user-progress')!)
    }

    const { fetchState } = useFetch(async () => {
      await loadProposalOfTheDay()

      const proposalFields = [
        'id', 'title', 'statement', 'short_statement', 'explanation', 'source_of_proposal', 'source_of_explanation', 'color',
        { arguments: ['id', 'statement', 'source'] },
        { topic: ['title', 'icon'] }
      ]
      const operation: IQueryBuilderOptions = {
        operation: 'me',
        fields: ['statement_progress', { doneProposals: proposalFields }, { openProposals: proposalFields }]
      }

      const q = query(operation)
      const { me: meResponse } = await client.query(q.query, q.variables)

      if (meResponse) {
        progress.value = meResponse.statement_progress
        openProposals.value = meResponse.openProposals
        doneProposals.value = meResponse.doneProposals

        localStorage.setItem('user-progress', progress.value.toString())
      }
    })

    onMounted(() => {
      window.onbeforeunload = () => {
        localStorage.removeItem('user-progress')
      }
    })

    return {
      progress,
      openProposals,
      doneProposals,
      fetchState,
      clicked () {
        if (!proposalOfTheDay.value) {
          return
        }

        router.push(`/statement/${proposalOfTheDay.value?.id}`)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
#header {
  height: 100px;
  /*background: url('/header.svg') no-repeat;*/
  background: rgba(58, 64, 144, 0.95);
  background-size: 100%;
  backdrop-filter: blur(10px);

  @apply sticky top-0 left-0 z-10
}

#logo {
  height: 70px;

  @apply pt-6 block mx-auto;
}

.statements {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  scrollbar-width: none;  /* Firefox */
}

.statements::-webkit-scrollbar {
  display: none;
}

.see-all-btn {
  @apply shadow px-3 font-medium bg-white float-right mr-3
}
</style>
