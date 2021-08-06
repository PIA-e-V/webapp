// https://github.com/nuxt-community/pwa-module/issues/239#issuecomment-796807081

import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(async () => {
  // @ts-ignore
  const workbox = await window.$workbox

  if (!workbox) {
    console.debug("Workbox couldn't be loaded.")
    return
  }

  workbox.addEventListener('installed', (event: any) => {
    if (!event.isUpdate) {
      console.debug('The PWA is on the latest version.')
      return
    }

    console.debug('There is an update for the PWA, reloading...')
    window.location.reload()
  })
})
