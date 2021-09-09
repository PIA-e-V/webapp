<template>
  <transition name="fade" @after-leave="$emit('after-leave')">
    <div v-if="!isReady">
      <div class="splash-container">
        <img class="mx-auto block" src="/logo.png" alt="Splash Screen" />
      </div>
      <div class="spinner text-center mt-16">
        <span class="material-icons animate-spin">autorenew</span>
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
  background: $primary;
  @apply pt-12 pb-10;

  img {
    width: 90%;
  }
}

.spinner span {
  font-size: 60pt;
  color: #575a6d;
}
</style>
