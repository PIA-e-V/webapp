<template>
  <div>
    <h1 class="text-center">{{ typeTranslations[$route.params.type] }}</h1>

    <LogoSpinner v-if="loading && $route.params.type !== 'petitions'" class="mx-auto mt-10" size="64px" />

    <div v-if="!loading && $route.params.type !== 'petitions'" id="tabs">
      <div class="tab" :class="{ active: currentTab === 'open' }" @click="currentTab = 'open'">
        Offen ({{ openCount }})
      </div>
      <div class="tab" :class="{ active: currentTab === 'done' }" @click="currentTab = 'done'">
        Erledigt ({{ doneCount }})
      </div>
    </div>

    <div v-if="$route.params.type === 'petitions'" class="pt-12 px-4">
      <ComingSoon />
      <p class="text-center">Bald kannst du dich hier über Petitionen informieren</p>
    </div>
    <div v-else>
      <div v-show="!loading" class="px-2">
        <h2
          v-if="(currentTab === 'open' && openCount === 0) || (currentTab === 'done' && doneCount === 0)"
          class="text-center"
        >
          Keine Einträge vorhanden ...
        </h2>
        <transition-group
          tag="div"
          name="fade"
          class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3"
        >
          <FeedCard v-for="item in feedItems" :key="item.id" :item="item" class="mb-4"></FeedCard>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useRoute } from '@nuxtjs/composition-api'
import { FeedItem, FeedType } from '~/@types/graphql-types'
import useUser from '~/store/useUser'
import gql from 'graphql-tag'
import { useQuery, useResult } from '@vue/apollo-composable'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { user } = useUser()

    const currentTab = ref<'open' | 'done'>('open')

    const feedType: FeedType = route.value.params.type === 'proposals' ? FeedType.Proposals : FeedType.News

    const { result, loading } = useQuery(
      gql`
        query ($feedType: FeedType!) {
          feedByType(type: $feedType) {
            id
            active_from
            feedable {
              __typename
              ... on Proposal {
                id
                short_statement
                image
                title
                topic {
                  icon
                  title
                }
              }
              ... on Statement {
                id
                short_statement
                image
                title
                topic {
                  icon
                  title
                }
              }
            }
          }
        }
      `,
      {
        feedType
      }
    )

    const feedItems = useResult(result, [] as FeedItem[], (data) => data.feedByType)

    return {
      loading,
      currentTab,
      user,
      openCount: computed(() => {
        switch (feedType) {
          case FeedType.Proposals:
            return user.value.openProposals.length
          case FeedType.News:
            return user.value.openStatements.length
          default:
            return 0
        }
      }),
      doneCount: computed(() => {
        switch (feedType) {
          case FeedType.Proposals:
            return user.value.doneProposals.length
          case FeedType.News:
            return user.value.doneStatements.length
          default:
            return 0
        }
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

          return feedItems.value.filter((item: FeedItem) => ids.includes(item.feedable.id))
        }
        if (feedType === FeedType.News) {
          const proposals = currentTab.value === 'open' ? user.value.openStatements : user.value.doneStatements
          const ids = proposals.map((p) => p.id)

          return feedItems.value.filter((item: FeedItem) => ids.includes(item.feedable.id))
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
