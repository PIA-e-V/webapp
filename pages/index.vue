<template>
  <div>
    <div>
      <img class="logo my-4" src="/logo.svg" alt="Logo" />
    </div>

    <LogoSpinner v-if="!feed" class="mx-auto mt-10" size="64px" />

    <div v-show="feed" class="px-2">
      <div class="grid grid-cols-1 auto-rows-auto md:grid-cols-2 md:gap-2 lg:grid-cols-3">
        <FeedCard v-for="item in feed" :key="item.id" :item="item" class="mb-4"></FeedCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, useRouter } from '@nuxtjs/composition-api'
import gql from 'graphql-tag'

export default defineComponent({
  apollo: {
    feed: gql`
      query {
        feed {
          id
          active_from
          feedable {
            __typename
            ... on Proposal {
              id
              short_statement
              image
              topic {
                icon
                title
              }
            }
            ... on Statement {
              id
              short_statement
              image
              news
              topic {
                icon
                title
              }
            }
          }
        }
      }
    `
  },
  setup(_, { root }) {
    const router = useRouter()

    onBeforeMount(() => {
      router.push('/widget')
    })

    const progress = ref(0)

    if (localStorage.getItem('user-progress')) {
      progress.value = parseInt(localStorage.getItem('user-progress')!)
    }

    onMounted(() => {
      window.onbeforeunload = () => {
        localStorage.removeItem('user-progress')
      }
    })

    return {
      progress
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
