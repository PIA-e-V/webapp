<template>
  <div id="registration-card">
    <template v-if="isRegistered">
      <h1>Account bestätigen</h1>

      <div class="text-center">
        Du musst nun deinen Account bestätigen, indem du auf den Link in der E-Mail klickst.
      </div>

      <Button small class="mx-auto mt-4" @click="$router.push('/profile/account')"> Zum Login </Button>
    </template>
    <template v-else>
      <h1>Registrierung</h1>

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

      <div class="mt-5">
        <label for="password-confirmation">Passwort wiederholen</label>
        <input
          id="password-confirmation"
          v-model.trim="credentials.passwordConfirmation"
          type="password"
          @keyup.enter="submit"
        />
      </div>

      <div class="mt-8">
        <div class="mb-2 px-1">
          Du hast bereits einen Account?
          <nuxt-link to="/profile/account" class="underline"> Login </nuxt-link>
        </div>
        <button class="primary" @click="submit">Registrieren</button>
      </div>

      <div class="mt-5">
        Mit der Registrierung erklärst du dich einverstanden mit den
        <PrivacyDialog> Allgemeine Geschäftsbedingungen und der Datenschutzerklärung </PrivacyDialog>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import useNotifications from '~/composables/useNotifications'
import useValidation from '~/composables/useValidation'
import useUser from '~/store/useUser'

export default defineComponent({
  layout: 'header',
  setup() {
    const { error, success } = useNotifications()
    const { register } = useUser()
    const { validate, email: validateEmail, min: minLength, mustMatch } = useValidation()

    const credentials = reactive({
      email: '',
      password: '',
      passwordConfirmation: ''
    })

    const isRegistered = ref(false)
    const loading = ref(false)

    return {
      credentials,
      isRegistered,
      async submit() {
        if (loading.value) {
          return
        }
        loading.value = true

        const result = validate([
          () => validateEmail(credentials.email),
          () => minLength(credentials.password, 6, 'Das Passwort muss mindestens 6 Zeichen lang sein'),
          () => mustMatch(credentials.password, credentials.passwordConfirmation, 'Passwörter stimmen nicht überein')
        ])
        if (!result.isValid) {
          error(result.message!)
          loading.value = false
          return
        }

        const response = await register(credentials.email, credentials.password)

        if (!response.status) {
          error(response.message!)
          loading.value = false
          return
        }

        success('Die Registrierung war erfolgreich')
        loading.value = false
        isRegistered.value = true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#registration-card {
  max-width: 400px;
  width: calc(100% - 40px);

  @apply rounded mx-auto mt-5 shadow-lg border p-4;
}

#registration-card h1 {
  @apply pl-1 font-bold pb-1 text-center;
}

#registration-card label {
  @apply block mb-2 pl-1;
}

#registration-card input {
  @apply w-full border-2 rounded-xl p-2 outline-none;
}

#registration-card input:focus {
  border-color: #8078d8;
}

#registration-card button {
  @apply block text-center w-full py-1 text-black rounded-xl outline-none;
}

#registration-card button.primary {
  background: #343e94;

  @apply text-white;
}
</style>
