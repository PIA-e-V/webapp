<template>
  <transition name="fade" @after-leave="$emit('after-leave')">
    <div v-if="!isReady">
      <div class="splash-container">
        <img class="" src="/logo.svg" alt="Splash Screen" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useAppState from '~/composables/useAppState'

export default defineComponent({
  emits: ['after-leave'],
  setup() {
    const { isReady } = useAppState()

    return {
      isReady,
      transitionActive: ref(!isReady.value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.splash-container {
  img {
    max-height: 50px;
    max-width: calc(100% - 20px);

    @apply block mx-auto my-4;
  }
}
</style>
