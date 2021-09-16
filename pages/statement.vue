<template>
  <div>
    <transition name="fade">
      <header v-if="fetchState.timestamp">
        <div class="title-bar">
          <div>
            <span class="material-icons">arrow_back_ios</span>
          </div>
          <h1>{{ title }}</h1>
        </div>

        <Stepper class="mt-2" />
      </header>
    </transition>

    <transition name="fade">
      <NuxtChild v-if="fetchState.timestamp" :proposal="proposal" @titleChanged="titleChanged" />
    </transition>
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
@import '/assets/_variables.scss';

header {
  @apply sticky top-0 bg-white z-10 pb-1;

  .title-bar {
    height: 40px;
    $sideWidth: 50px;
    grid-template-columns: $sideWidth auto $sideWidth;
    @apply grid;

    div {
      line-height: 38px;
      @apply text-center h-full;

      span {
        @apply inline-block align-middle;
      }
    }

    h1 {
      font-size: 22px;
      font-weight: 500;
      font-family: 'Barlow';
      line-height: 40px;
      @apply text-center;
    }
  }
}
</style>
