<template>
  <div class="h-full">
    <img src="/onboarding/login/login.png" class="mx-auto block mt-5" style="height: 30vh" alt="Login" />

    <div class="btn-container">
      <Button class="proceed-btn" background="white" color="#3A4090FF" @click="$router.push('/registration')">
        Register
      </Button>

      <Button class="proceed-btn mt-5" background="white" color="#3A4090FF" @click="$router.push('/login')">
        Login
      </Button>

      <div class="underline outline-none mt-5 cursor-pointer" @click="proceedWithoutLogin()">Ohne Konto fortfahren</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api'
import useConfirmationDialog from '~/composables/useConfirmationDialog'

export default defineComponent({
  layout: 'onboarding',
  setup() {
    const router = useRouter()
    const { confirm } = useConfirmationDialog()

    onMounted(() => {
      localStorage.setItem('onboarding.login', '1')
    })

    return {
      async proceedWithoutLogin() {
        const proceed = await confirm(
          'Login / Registrierung',
          'Wenn du ohne ein Benutzerkonto weitermachst, gehen deine Fortschritte nach 7 Tagen Inkativität verloren.'
        )

        if (proceed) {
          router!.push('/')
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
* {
  color: white;

  @apply text-center;
}

h1 {
  font-size: 15pt;

  @apply font-bold;
}

h2 {
  color: #ffdf57;
  font-size: 15pt;

  @apply font-bold;
}

.btn-container {
  @apply mt-5;
}

.proceed-btn {
  width: 150px !important;
  display: block !important;
  @apply mx-auto shadow text-center;
}
</style>
