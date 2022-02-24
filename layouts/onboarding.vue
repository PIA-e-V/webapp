<template>
  <div id="onboarding">
    <img src="/logo_white.svg" alt="Logo" />

    <Nuxt />

    <Notification />

    <ConfirmationDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
</script>

<style lang="scss" scoped>
#onboarding {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: #343e94;
}

#onboarding img:first-child {
  width: min(90%, 300px);

  @apply block mx-auto pt-5;
}
</style>
