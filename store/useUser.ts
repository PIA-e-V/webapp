import { readonly, ref } from '@nuxtjs/composition-api'
import { mutation, query } from 'gql-query-builder'
import { RegistrationResponse, User } from '~/@types/graphql-types'
import useGraphql from '~/composables/useGraphql'
import useAppState from '~/composables/useAppState'

const checked = ref(false)
const user = ref<User>({} as User)
const isAuthenticated = ref<boolean>()
const checkCallbacks = ref<Array<(authenticated: boolean) => void>>([])
export default function () {
  const client = useGraphql()
  const { registerWaiter } = useAppState()

  const userFieldsToLoad = ['id', 'email', { doneProposals: ['id'] }, { openProposals: ['id'] }]

  async function register(email: string, password: string) {
    const q = mutation({
      operation: 'register',
      variables: {
        email: { value: email, required: true },
        password: { value: password, required: true }
      },
      fields: ['status', 'message']
    })

    const { register } = await client.mutation(q.query, q.variables)

    if (register) {
      return register
    }

    return {
      status: false,
      message: 'Unbekannter Fehler'
    } as RegistrationResponse
  }

  async function verify(token: string) {
    const q = mutation({
      operation: 'verifyUser',
      variables: {
        token: { value: token, required: true }
      },
      fields: ['status']
    })

    const { verifyUser } = await client.mutation(q.query, q.variables)

    if (verifyUser) {
      return verifyUser.status
    }

    return false
  }

  async function login(email: string, password: string) {
    const q = mutation({
      operation: 'login',
      variables: {
        email: { value: email, required: true },
        password: { value: password, required: true }
      },
      fields: ['token', { user: userFieldsToLoad }]
    })

    const { login } = await client.mutation(q.query, q.variables)

    localStorage.setItem('auth-token', login.token)

    user.value = login.user!

    isAuthenticated.value = true
  }

  async function registerAnonymousUser() {
    const q = mutation({
      operation: 'registerAnonymousUser',
      fields: ['token', { user: userFieldsToLoad }]
    })

    try {
      const { registerAnonymousUser } = await client.mutation(q.query, q.variables)

      localStorage.setItem('auth-token', registerAnonymousUser.token)

      user.value = registerAnonymousUser.user!
    } catch {
      return false
    }

    return true
  }

  async function logout() {
    const q = mutation({
      operation: 'logout',
      fields: ['id']
    })

    await client.mutation(q.query, q.variables)

    isAuthenticated.value = false

    localStorage.removeItem('auth-token')

    await registerAnonymousUser()
  }

  function onAfterChecked(callback: (authenticated: boolean) => void) {
    if (isAuthenticated.value !== undefined) {
      // eslint-disable-next-line node/no-callback-literal
      callback(isAuthenticated.value!)
    } else {
      checkCallbacks.value.push(callback)
    }
  }

  async function checkUser() {
    if (checked.value) {
      return
    }
    checked.value = true

    const callCallbacks = () => {
      checkCallbacks.value.forEach((callback) => {
        // eslint-disable-next-line node/no-callback-literal
        callback(isAuthenticated.value!)
      })
      checkCallbacks.value = []
    }

    const waiter = registerWaiter()

    const authToken = localStorage.getItem('auth-token')
    if (authToken) {
      const q = query({
        operation: 'me',
        fields: userFieldsToLoad
      })

      try {
        const { me } = await client.query(q.query, q.variables)
        if (me && me.id) {
          user.value = me
          isAuthenticated.value = !me.email?.endsWith('@ftv.de')
          callCallbacks()
          waiter.setReady()
          return
        }
      } catch {}
    }

    if (await registerAnonymousUser()) {
      waiter.setReady()

      callCallbacks()
    }
  }

  return {
    register,
    login,
    logout,
    verify,
    checkUser,
    onAfterChecked,
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated)
  }
}
