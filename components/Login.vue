<template>
  <div class="login-card">
    <h1>Login</h1>

    <div>
      <label for="email-address">E-Mail Adresse</label>
      <input
        id="email-address"
        v-model.trim="credentials.email"
        type="email"
        class="focus:border-blue-100"
        @keyup.enter="submit"
      />
    </div>

    <div class="mt-5">
      <label for="password">Passwort</label>
      <input id="password" v-model.trim="credentials.password" type="password" @keyup.enter="submit" />
    </div>

    <div class="mt-8">
      <div class="grid grid-cols-2 auto-rows-auto mb-2 px-1">
        <div>
          <!--          <nuxt-link to="/forgot-pw" class="underline">-->
          <!--            Passwort vergessen-->
          <!--          </nuxt-link>-->
        </div>
        <div class="text-right">
          <span class="underline cursor-pointer" @click="$emit('registrationClicked')"> Registrieren </span>
        </div>
      </div>
      <button class="primary" @click="submit">Login</button>
    </div>

    <!--    <hr class="my-5">-->

    <!--    <div class="mt-5">-->
    <!--      <button class="border">-->
    <!--        <img src="/icons/google.png" alt="Google" class="float-left" style="height: 24px">-->
    <!--        Login mit Google-->
    <!--      </button>-->
    <!--    </div>-->

    <!--    <div class="mt-5">-->
    <!--      <button class="border">-->
    <!--        <img src="/icons/apple.png" alt="Apple" class="float-left" style="height: 24px">-->
    <!--        Login mit Apple-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api'
import useUser from '~/store/useUser'
import useNotifications from '~/composables/useNotifications'

export default defineComponent({
  emits: ['registrationClicked'],
  setup() {
    const { login, isAuthenticated } = useUser()
    const { success, error } = useNotifications()
    const router = useRouter()

    const loading = ref(false)
    const credentials = reactive({
      email: '',
      password: ''
    })

    return {
      credentials,
      async submit() {
        if (loading.value) {
          return
        }
        loading.value = true

        try {
          await login(credentials.email, credentials.password)
        } catch {
          error('Falsche Zugangsdaten oder die E-Mail Adresse wurde noch nicht bestätigt')
          loading.value = false
          return
        }

        if (isAuthenticated) {
          success('Du bist eingeloggt')
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.login-card {
  @apply select-none outline-none;

  h1 {
    @apply pl-1 pb-2;
  }

  label {
    @apply block mb-2 pl-1;
  }

  input {
    @apply w-full border-2 rounded p-2 outline-none;

    &:focus {
      border-color: $light-blue;
    }
  }

  button {
    @apply block text-center w-full py-1 text-black rounded-full outline-none px-2;

    &.primary {
      background: $primary;

      @apply text-white;
    }
  }
}
</style>
