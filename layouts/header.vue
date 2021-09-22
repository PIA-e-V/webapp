<template>
  <div class="container mx-auto relative">
    <SplashScreen @after-leave="transitionActive = false" />

    <div v-if="isReady && !transitionActive" id="header">
      <div v-if="$route.path === '/'" class="grid auto-rows-auto" style="grid-template-columns: auto">
        <!--        <div>-->
        <!--          <Button-->
        <!--            small-->
        <!--            background="white"-->
        <!--            color="black"-->
        <!--            class="mt-8 mx-auto"-->
        <!--            style="border-radius: 10px !important"-->
        <!--            @click="!isAuthenticated ? $router.push('/login') : logout()"-->
        <!--          >-->
        <!--            {{ isAuthenticated ? 'Log out' : 'Log in' }}-->
        <!--          </Button>-->
        <!--        </div>-->
        <div>
          <img class="logo mt-4" src="/logo.svg" alt="Logo" />
        </div>
      </div>

      <div v-else>
        <img class="logo pt-6" style="height: 70px; max-height: unset" src="/logo.svg" alt="Logo" />
      </div>
    </div>

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

        <div>
          <Nuxt />
        </div>
      </div>
    </transition>

    <transition name="fade-reverse">
      <BottomNavigation v-if="isReady && !transitionActive" />
    </transition>

    <ConfirmationDialog />

    <Notification />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api'
import useAppState from '~/composables/useAppState'
import useOnboarding from '~/composables/useOnboarding'
import useUser from '~/store/useUser'
import useConfirmationDialog from '~/composables/useConfirmationDialog'

export default defineComponent({
  setup() {
    const { isReady } = useAppState()
    const { isAuthenticated, logout: logoutUser } = useUser()
    const { confirm } = useConfirmationDialog()
    useOnboarding()

    const menu = ref(false)

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
      isAuthenticated,
      menu,
      transitionActive: ref(!isReady.value),
      async logout() {
        const res = await confirm('Log out', 'Willst du dich wirklich ausloggen?')
        if (!res) {
          return
        }

        await logoutUser()
        window.location.reload()
      },
      toggleMenu() {
        menu.value = !menu.value
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#header {
  height: 70px;
  @apply sticky top-0 left-0 z-10;

  .logo {
    max-height: 50px;
    max-width: calc(100% - 20px);

    @apply block mx-auto;
  }
}

#main-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100 - 120px);

  overflow-y: scroll;

  @apply pb-4;
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

  @apply m-2 ml-4 mt-8 hidden;
}

#burger-menu-btn .material-icons {
  font-size: 32px;
}

#side-menu {
  width: 250px;
  height: 100vh;
  border-right: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  box-shadow: 5px 0 5px 0 rgba(0, 0, 0, 0.33);
  z-index: 20;

  @apply absolute top-0 left-0 bg-white my-0 pt-16 pl-0;
}

#side-menu > section {
  border-top: 1px solid lightgrey;
  outline: none;

  @apply pl-6 py-2 font-bold cursor-pointer;
}

#side-menu > section:last-child {
  border-bottom: 1px solid lightgrey;
}
</style>
