<template>
  <div>
    <h1 class="pt-1 mb-2 text-center">{{ typeTranslations[$route.params.type] }}</h1>

    <LogoSpinner v-if="loading" class="mx-auto mt-10" size="64px" />

    <Tabs v-if="!loading">
      <Tab
        v-for="t in [
          { title: `Offen (${openCount})`, tabState: 'open' },
          { title: `Erledigt (${doneCount})`, tabState: 'done' }
        ]"
        :key="t.title"
        :title="t.title"
        @click="currentTab = t.tabState"
      >
        <h2 v-if="feedItems.length === 0" class="text-center">Keine weiteren Einträge vorhanden ...</h2>
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3">
          <FeedCard v-for="item in feedItems" :key="item.id" :item="item" class="mb-4"></FeedCard>
        </div>
      </Tab>
    </Tabs>
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

    let feedType: FeedType = FeedType.Proposals
    switch (route.value.params.type) {
      case 'news':
        feedType = FeedType.News
        break
      case 'petitions':
        feedType = FeedType.Petitions
        break
    }

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
                news
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
            return user.value.openStatements.filter((s) => s.news).length
          case FeedType.Petitions:
            return user.value.openStatements.filter((s) => s.has_petition).length
          default:
            return 0
        }
      }),
      doneCount: computed(() => {
        switch (feedType) {
          case FeedType.Proposals:
            return user.value.doneProposals.length
          case FeedType.News:
            return user.value.doneStatements.filter((s) => s.news).length
          case FeedType.Petitions:
            return user.value.doneStatements.filter((s) => s.has_petition).length
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
          const statements = currentTab.value === 'open' ? user.value.openStatements : user.value.doneStatements
          const ids = statements.map((p) => p.id)

          return feedItems.value.filter((item: FeedItem) => ids.includes(item.feedable.id))
        }
        if (feedType === FeedType.Petitions) {
          const statements = currentTab.value === 'open' ? user.value.openStatements : user.value.doneStatements
          const ids = statements.map((p) => p.id)

          return feedItems.value.filter((item: FeedItem) => ids.includes(item.feedable.id))
        }
        return []
      })
    }
  }
})
</script>
