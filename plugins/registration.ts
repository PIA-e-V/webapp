import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api'
import { mutation, query } from 'gql-query-builder'
import useGraphql from '~/composables/useGraphql'
import useAppState from '~/composables/useAppState'

export default defineNuxtPlugin(() => {
  onGlobalSetup(async () => {
    const client = useGraphql()
    const { setReady } = useAppState()

    const authToken = localStorage.getItem('auth-token')
    if (authToken) {
      const q = query({
        operation: 'me',
        fields: ['id']
      })

      try {
        const { me } = await client.query(q.query, q.variables)
        if (me && me.id) {
          setReady()
          return
        }
      } catch {}
    }

    const q = mutation({
      operation: 'registerAnonymousUser',
      fields: ['token']
    })

    try {
      const { registerAnonymousUser } = await client.mutation(q.query, q.variables)

      localStorage.setItem('auth-token', registerAnonymousUser.token)

      setReady()
    } catch {
      // TODO error page or something
    }
  })
})
