<template>
  <div class="container mx-auto relative">
    <transition name="fade" @after-leave="transitionActive = false">
      <div v-if="!isReady" style="background: #3A4090" class="pt-12 pb-10">
        <img class="mx-auto" style="width: 90vw" src="/logo.png" alt="Splash Screen">
      </div>
    </transition>

    <transition name="slide-in-left">
      <div v-if="menu" id="side-menu">
        <section>Einstellungen</section>
        <section>Datenschutz</section>
        <section>Impressum</section>
      </div>
    </transition>

    <transition name="fade-reverse">
      <div v-if="isReady && !transitionActive" id="main-container">
        <button id="burger-menu-btn" @click="toggleMenu">
          <span class="material-icons">{{ menu ? 'close' : 'menu' }}</span>
        </button>

        <div style="height: 100%">
          <Nuxt />
        </div>
      </div>
    </transition>

    <transition name="fade-reverse">
      <BottomNavigation v-if="isReady && !transitionActive" />
    </transition>

    <ConfirmationDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref, useRouter } from '@nuxtjs/composition-api'
import BottomNavigation from '~/components/BottomNavigation.vue'
import useAppState from '~/composables/useAppState'

export default defineComponent({
  components: {
    BottomNavigation
  },
  setup () {
    const router = useRouter()
    const { isReady } = useAppState()

    const menu = ref(false)

    onBeforeMount(() => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      // We listen to the resize event
      window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    })

    onMounted(() => {
      if (localStorage.getItem('onboarding.initial') !== '1') {
        window.location.href = '/onboarding/'
      }
    })

    return {
      isReady,
      menu,
      transitionActive: ref(true),
      toggleMenu () {
        menu.value = !menu.value
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
#main-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100 - 50px);

  overflow-y: scroll;
}

#burger-menu-btn {
  top: 0;
  left: 0;
  position: absolute;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  z-index: 25;
  color: white;

  @apply m-2 ml-4 mt-8 hidden
}

#burger-menu-btn .material-icons {
  font-size: 32px;
}

#side-menu {
  width: 250px;
  height: 100vh;
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  box-shadow: 5px 0 5px 0 rgba(0,0,0,0.33);
  z-index: 20;

  @apply absolute top-0 left-0 bg-white my-0 pt-16 pl-0
}

#side-menu>section {
  border-top: 1px solid lightgrey;
  outline: none;

  @apply pl-6 py-2 font-bold cursor-pointer
}

#side-menu>section:last-child {
  border-bottom: 1px solid lightgrey;
}
</style>
