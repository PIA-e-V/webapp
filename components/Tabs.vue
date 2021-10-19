<template>
  <div>
    <div class="tabs">
      <h2
        class="tab__header ripple"
        :class="{ active: selectedTabIndex === index }"
        v-for="(tab, index) in tabs"
        :key="tab.title"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </h2>
    </div>

    <div class="tab__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, { slots }) {
    const tabs = ref<any[]>([])
    const selectedTabIndex = ref(0)

    const selectTab = (i: number) => {
      selectedTabIndex.value = i

      // loop over all the tabs
      tabs.value.forEach((tab, index) => {
        tab.setActive(index === i)
        if (index === i) {
          tab.$emit('click')
        }
      })
    }

    onMounted(() => {
      if (slots.default) {
        tabs.value = slots
          .default()
          .filter((child) => child.componentOptions && child.componentOptions.tag === 'Tab')
          .map((c) => (c as any).child)
      }

      selectTab(0)
    })

    return {
      tabs,
      selectTab,
      selectedTabIndex
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.tabs {
  @apply flex flex-row;

  .tab__header {
    color: $medium-grey;
    @apply flex-grow text-center p-2 cursor-pointer;

    &.active {
      color: $primary;
      border-bottom: 2px solid $primary;
    }
  }
}

.tab__content {
  @apply px-4 pt-4;
}
</style>
