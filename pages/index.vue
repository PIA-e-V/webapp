<template>
  <div>
    <div>
      <img class="logo my-4" src="/logo.svg" alt="Logo" />
    </div>

    <!--    <h1 class="pl-6 pt-4">Fortschritt</h1>-->

    <!--    <div class="grid px-6 pt-2" style="grid-template-columns: 50px auto">-->
    <!--      <div style="line-height: 30px; font-size: 18px">{{ `${doneProposals.length}/30` }}</div>-->
    <!--      <div><UserProgress :value="progress" /></div>-->
    <!--    </div>-->

    <div v-show="!fetchState.pending" class="px-2">
      <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3">
        <FeedCard v-for="item in feedItems" :key="item.id" :item="item" class="mb-4"></FeedCard>
      </div>
    </div>

    <!--    <hr class="mt-2" />-->

    <!--    <h1 class="pl-6 pt-4">Statements</h1>-->

    <!--    <h2 class="pl-6 pt-3 font-bold" style="line-height: 30px">-->
    <!--      Offen<span v-if="fetchState.timestamp && openProposals.length > 0"> ({{ openProposals.length }})</span>-->

    <!--      <Button-->
    <!--        v-if="fetchState.timestamp && openProposals.length > 0"-->
    <!--        class="see-all-btn"-->
    <!--        icon="arrow_forward"-->
    <!--        background="white"-->
    <!--        color="#3A4090"-->
    <!--        small-->
    <!--        @click="$router.push('/statements/open')"-->
    <!--      >-->
    <!--        Übersicht-->
    <!--      </Button>-->
    <!--    </h2>-->
    <!--    <h3 v-show="fetchState.pending" class="pl-6 pt-6">Lade Statements ...</h3>-->
    <!--    <h3 v-show="fetchState.timestamp && openProposals.length === 0" class="pl-6 pt-6">-->
    <!--      Keine offenen Statements verfügbar-->
    <!--    </h3>-->
    <!--    <section class="statements">-->
    <!--      <ProposalCard v-for="proposal in openProposals" :key="proposal.id" :value="proposal" />-->
    <!--    </section>-->

    <!--    <h2 class="pl-6 pt-3 font-bold" style="line-height: 30px">-->
    <!--      Erledigt<span v-if="fetchState.timestamp && doneProposals.length > 0"> ({{ doneProposals.length }})</span>-->

    <!--      <Button-->
    <!--        v-if="fetchState.timestamp && doneProposals.length > 0"-->
    <!--        class="float-right see-all-btn"-->
    <!--        icon="arrow_forward"-->
    <!--        background="white"-->
    <!--        color="#3A4090"-->
    <!--        small-->
    <!--        @click="$router.push('/statements/done')"-->
    <!--      >-->
    <!--        Übersicht-->
    <!--      </Button>-->
    <!--    </h2>-->
    <!--    <h3 v-show="fetchState.pending" class="pl-6 pt-6">Lade Statements ...</h3>-->
    <!--    <h3 v-show="fetchState.timestamp && doneProposals.length === 0" class="pl-6 pt-6">-->
    <!--      Bisher keine Statements abgeschlossen-->
    <!--    </h3>-->
    <!--    <section class="statements">-->
    <!--      <ProposalCard v-for="proposal in doneProposals" :key="proposal.id" :value="proposal" />-->
    <!--    </section>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useFetch, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { query } from 'gql-query-builder'
import UserProgress from '~/components/UserProgress.vue'
import ProposalCard from '~/components/ProposalCard.vue'
import useProposals from '~/store/useProposals'
import useGraphql from '~/composables/useGraphql'
import { FeedItem, Proposal } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    UserProgress,
    ProposalCard
  },
  setup(_, { root }) {
    const router = useRouter()
    const { proposalOfTheDay } = useProposals()
    const client = useGraphql()

    const feedItems = ref<FeedItem[]>([])

    const progress = ref(0)
    const openProposals = ref<Proposal[]>([])
    const doneProposals = ref<Proposal[]>([])

    if (localStorage.getItem('user-progress')) {
      progress.value = parseInt(localStorage.getItem('user-progress')!)
    }

    const { fetchState } = useFetch(async () => {
      root.$nuxt.$loading.start()

      const q = `query {
        feed {
          id active_from
          feedable {
            __typename
            ...on Proposal {
              id short_statement topic { icon }
            }
            ... on Statement {
              id short_statement topic { icon }
            }
          }
        }
      }`

      const { feed } = await client.query(q)

      feedItems.value = feed

      // const proposalFields = [
      //   'id',
      //   'title',
      //   'short_statement',
      //   // { arguments: ['id', 'statement', 'source'] },
      //   { topic: ['title', 'icon'] }
      // ]
      // const operation: IQueryBuilderOptions = {
      //   operation: 'me',
      //   fields: ['statement_progress', { doneProposals: proposalFields }, { openProposals: proposalFields }]
      // }
      //
      // const q = query(operation)
      // const { me: meResponse } = await client.query(q.query, q.variables)
      //
      // if (meResponse) {
      //   progress.value = meResponse.statement_progress
      //   openProposals.value = meResponse.openProposals
      //   doneProposals.value = meResponse.doneProposals
      //
      //   localStorage.setItem('user-progress', progress.value.toString())
      // }

      root.$nuxt.$loading.finish()
    })

    onMounted(() => {
      window.onbeforeunload = () => {
        localStorage.removeItem('user-progress')
      }
    })

    return {
      feedItems,
      progress,
      openProposals,
      doneProposals,
      fetchState,
      clicked() {
        if (!proposalOfTheDay.value) {
          return
        }

        router.push(`/statement/${proposalOfTheDay.value?.id}`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
h1 {
  font-size: 18pt;
  font-family: 'Bree Serif', serif;
  font-weight: 500;
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

.logo {
  max-height: 50px;
  max-width: calc(100% - 20px);

  @apply block mx-auto;
}

.see-all-btn {
  @apply shadow px-3 font-medium bg-white float-right mr-3;
}
</style>
