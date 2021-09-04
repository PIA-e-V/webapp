import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(async () => {
  if (screen && screen.orientation) {
    try {
      await screen.orientation.lock('portrait')
    } catch {}
  }
})
