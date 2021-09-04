// https://github.com/nuxt-community/pwa-module/issues/239#issuecomment-796807081

import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import useAppState from '~/composables/useAppState'

export default defineNuxtPlugin(async () => {
  const { registerWaiter } = useAppState()
  const waiter = registerWaiter()

  // @ts-ignore
  const workbox = await window.$workbox

  if (!workbox) {
    // Workbox couldn't be loaded
    waiter.setReady()
    return
  }

  workbox.addEventListener('installed', (event: any) => {
    if (!event.isUpdate) {
      // The PWA is on the latest version
      waiter.setReady()
      return
    }

    // There is an update for the PWA, reloading...
    window.location.reload()
    waiter.setReady()
  })

  try {
    // const active = await workbox.active
    // if (active.state === 'activated') {
    // }
    await workbox.active

    waiter.setReady()
  } catch {
    waiter.setReady()
  }
})
