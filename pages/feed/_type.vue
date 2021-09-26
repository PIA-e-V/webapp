<template>
  <div>
    <h1 class="text-center">{{ typeTranslations[$route.params.type] }}</h1>

    <LogoSpinner v-if="fetchState.pending && $route.params.type !== 'petitions'" class="mx-auto mt-10" size="64px" />

    <div v-if="!fetchState.pending && $route.params.type !== 'petitions'" id="tabs">
      <div class="tab" :class="{ active: currentTab === 'open' }" @click="currentTab = 'open'">
        Offen ({{ openCount }})
      </div>
      <div class="tab" :class="{ active: currentTab === 'done' }" @click="currentTab = 'done'">
        Erledigt ({{ doneCount }})
      </div>
    </div>

    <div v-if="$route.params.type === 'petitions'" class="pt-12 px-4">
      <CommingSoon />
      <p class="text-center">Bald kannst du dich hier über Petitionen informieren</p>
    </div>
    <div v-else>
      <div v-show="!fetchState.pending" class="px-2">
        <h2 v-if="(currentTab === 'open' && openCount === 0) || (currentTab === 'done' && doneCount === 0)">
          Keine Einträge vorhanden ...
        </h2>
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3">
          <FeedCard v-for="item in feedItems" :key="item.id" :item="item" class="mb-4"></FeedCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import { FeedItem, FeedType } from '~/@types/graphql-types'
import useGraphql from '~/composables/useGraphql'
import useUser from '~/store/useUser'

export default defineComponent({
  setup(_, { root }) {
    const route = useRoute()
    const client = useGraphql()
    const { user } = useUser()

    const currentTab = ref<'open' | 'done'>('open')
    const feedItems = ref<FeedItem[]>([])

    const feedType: FeedType = route.value.params.type === 'proposals' ? FeedType.Proposals : FeedType.News

    const { fetchState } = useFetch(async () => {
      root.$nuxt.$loading.start()

      const q = `query ($type: FeedType!) {
        feedByType (type: $type) {
          id active_from
          feedable {
            __typename
            ...on Proposal { id short_statement image title topic { icon title } }
            ... on Statement { id short_statement image title topic { icon title } }
          }
        }
      }`

      const { feedByType } = await client.query(q, { type: feedType })

      feedItems.value = feedByType

      root.$nuxt.$loading.finish()
    })
    return {
      fetchState,
      currentTab,
      user,
      openCount: computed(() => {
        if (feedType === FeedType.Proposals) {
          return user.value.openProposals.length
        } else if (feedType === FeedType.News) {
          return user.value.openStatements.length
        }

        return 0
      }),
      doneCount: computed(() => {
        if (feedType === FeedType.Proposals) {
          return user.value.doneProposals.length
        } else if (feedType === FeedType.News) {
          return user.value.doneStatements.length
        }

        return 0
      }),
      typeTranslations: {
        proposals: 'Anträge',
        news: 'News',
        petitions: 'Petitionen'
      },
      feedItems: computed(() => {
        if (feedType === FeedType.Proposals) {
          const proposals = currentTab.value === 'open' ? user.value.openProposals : user.value.doneProposals
          const ids = proposals.map((p) => p.id)

          return feedItems.value.filter((item) => ids.includes(item.feedable.id))
        }
        if (feedType === FeedType.News) {
          const proposals = currentTab.value === 'open' ? user.value.openStatements : user.value.doneStatements
          const ids = proposals.map((p) => p.id)

          return feedItems.value.filter((item) => ids.includes(item.feedable.id))
        }
        return feedItems.value
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

#tabs {
  @apply flex flex-row;

  .tab {
    font-size: 20px;
    color: #575a6d;
    @apply flex-grow text-center pb-2 mb-2 cursor-pointer;

    &.active {
      color: $primary;
      border-bottom: 2px solid $primary;
    }
  }
}
</style>
