<template>
  <div class="h-full argument-card" :class="{ 'sources-active': showSources }">
    <transition name="fade" @after-leave="transition = false">
      <div v-if="!transition && !showSources" class="h-full">
        <h2>Argument {{ current }}/{{ total }}</h2>

        <section class="content">{{ argument.statement }}</section>

        <div
          class="sources"
          @click="
            transition = true
            showSources = true
          "
        >
          <span>Quellen</span> <span class="material-icons">info</span>
        </div>
      </div>
    </transition>
    <transition name="fade" @after-leave="transition = false">
      <div v-if="!transition && showSources">
        <h2>Argument {{ current }}/{{ total }}</h2>

        <div v-html="argument.source" />

        <div
          class="sources"
          @click="
            transition = true
            showSources = false
          "
        >
          <span>Argument</span> <span class="material-icons back-icon">keyboard_arrow_left</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Argument } from '~/@types/graphql-types'

export default defineComponent({
  props: {
    argument: {
      type: Object as PropType<Argument>,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      transition: ref(false),
      showSources: ref(false)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.argument-card {
  background: $primary;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: calc(100% - 2rem);
  left: 1rem;
  top: 1rem;
  overflow-wrap: break-word;
  height: calc(100% - 24px);
  @apply rounded-xl text-white p-3 mx-auto absolute select-none outline-none overflow-y-scroll;

  &.sources-active {
    @apply bg-white text-black;
  }

  h2 {
    @apply mb-4;
  }

  .content {
    min-height: calc(100% - 78px);
  }

  .sources {
    @apply mt-4 text-right cursor-pointer relative right-0 bottom-0;

    .material-icons {
      vertical-align: bottom;
      font-size: 22px !important;

      &.back-icon {
        background: $primary;
        @apply rounded-full text-white;
      }
    }
  }

  &.slide-enter-to {
    @apply ml-2;
  }
}
</style>
