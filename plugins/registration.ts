import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import useUser from '~/store/useUser'

export default defineNuxtPlugin(() => {
  onGlobalSetup(async () => {
    const { checkUser } = useUser()

    await checkUser()
  })
})
