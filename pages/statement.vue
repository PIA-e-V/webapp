<template>
  <div>
    <header>
      <BackButton />

      <h1>{{ title }}</h1>
      <div v-if="fetchState.timestamp" class="short-statement">
        <span>{{ proposal.short_statement }}</span>
      </div>
    </header>

    <NuxtChild v-if="fetchState.timestamp" :proposal="proposal" @titleChanged="titleChanged" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch, useRoute } from '@nuxtjs/composition-api'
import useProposals from '~/store/useProposals'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { currentProposal: proposal, loadProposal } = useProposals()

    const { fetchState } = useFetch(async () => {
      const id = parseInt(route.value.params.id)
      await loadProposal(id)
    })

    const title = ref('')
    return {
      title,
      proposal,
      fetchState,
      titleChanged(eventTitle: string) {
        title.value = eventTitle
      }
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  height: 120px;
  background: #3a4090;

  h1 {
    color: white;
    font-size: 20pt;
    font-family: 'Bree Serif';
    @apply pt-4 font-bold text-center;
  }

  #back-btn {
    top: 26px;
  }

  .short-statement {
    color: white;

    @apply text-center font-light px-3;
  }
}
</style>
