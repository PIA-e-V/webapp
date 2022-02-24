<template>
  <div class="container mx-auto relative">
    <div id="main-container" class="h-full">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from '@nuxtjs/composition-api'
import BottomNavigation from '~/components/BottomNavigation.vue'
import useAppState from '~/composables/useAppState'
import useOnboarding from '~/composables/useOnboarding'

export default defineComponent({
  components: {
    BottomNavigation
  },
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
#main-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100 - 50px);

  overflow-y: scroll;
}
</style>
