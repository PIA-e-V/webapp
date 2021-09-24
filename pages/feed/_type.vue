<template>
  <div>
    <h1 class="text-center">{{ typeTranslations[$route.params.type] }}</h1>

    <div v-if="$route.params.type === 'petitions'" class="pt-12 px-4">
      <CommingSoon />
      <p class="text-center">Bald kannst du dich hier über Petitionen informieren</p>
    </div>
    <div v-else>
      <div v-show="!fetchState.pending" class="px-2">
        <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3">
          <FeedCard v-for="item in feedItems" :key="item.id" :item="item" class="mb-4"></FeedCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import { FeedItem, FeedType } from '~/@types/graphql-types'
import useGraphql from '~/composables/useGraphql'

export default defineComponent({
  setup(_, { root }) {
    const route = useRoute()
    const client = useGraphql()

    const feedItems = ref<FeedItem[]>([])

    const { fetchState } = useFetch(async () => {
      root.$nuxt.$loading.start()

      const q = `query ($type: FeedType!) {
        feedByType (type: $type) {
          id active_from
          feedable {
            __typename
            ...on Proposal { id }
            ... on Statement { id }
          }
        }
      }`

      const feedType: FeedType = route.value.params.type === 'proposals' ? FeedType.Proposals : FeedType.News

      const { feedByType } = await client.query(q, { type: feedType })

      feedItems.value = feedByType

      root.$nuxt.$loading.finish()
    })
    return {
      fetchState,
      feedItems,
      typeTranslations: {
        proposals: 'Anträge',
        news: 'News',
        petitions: 'Petitionen'
      }
    }
  }
})
</script>
