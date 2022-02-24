<template>
  <div class="container mx-auto relative">
    <SplashScreen @after-leave="transitionActive = false" />

    <transition name="fade-reverse">
      <div v-if="isReady && !transitionActive" id="main-container">
        <div class="h-full">
          <Nuxt />
        </div>
      </div>
    </transition>

    <!--    <ConfirmationDialog />-->

    <!--    <Notification />-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from '@nuxtjs/composition-api'
import BottomNavigation from '~/components/BottomNavigation.vue'
import useAppState from '~/composables/useAppState'
import useOnboarding from '~/composables/useOnboarding'

export default defineComponent({
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  },
  setup() {
    const { isReady } = useAppState()
    useOnboarding()

    function calculateScreenHeight() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    onBeforeMount(() => {
      calculateScreenHeight()

      // listen to the resize and orientationchange event
      window.addEventListener('resize', calculateScreenHeight)
      window.addEventListener('orientationchange', calculateScreenHeight)
    })

    return {
      isReady,
      transitionActive: ref(!isReady.value)
    }
  }
})
</script>

<style lang="scss" scoped>
#main-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  overflow-y: scroll;
}
</style>
