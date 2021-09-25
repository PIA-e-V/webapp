<template>
  <div>
    <div>
      <img class="logo my-4" src="/logo.svg" alt="Logo" />
    </div>

    <LogoSpinner v-if="fetchState.pending" class="mx-auto mt-10" size="64px" />

    <div v-show="!fetchState.pending" class="px-2">
      <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3">
        <FeedCard v-for="item in feedItems" :key="item.id" :item="item" class="mb-4"></FeedCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useFetch } from '@nuxtjs/composition-api'
import UserProgress from '~/components/UserProgress.vue'
import ProposalCard from '~/components/ProposalCard.vue'
import useGraphql from '~/composables/useGraphql'
import { FeedItem, Proposal } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    UserProgress,
    ProposalCard
  },
  setup(_, { root }) {
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
              id short_statement image topic { icon title }
            }
            ... on Statement {
              id short_statement image topic { icon title }
            }
          }
        }
      }`

      const { feed } = await client.query(q)

      feedItems.value = feed

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
      fetchState
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
