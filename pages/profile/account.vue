<template>
  <div class="px-4 pt-5">
    <div v-if="isAuthenticated">
      <h1>E-Mail</h1>
      <p>{{ user.email }}</p>

      <div class="logout-btn ripple" @click="logout">Ausloggen</div>
      <br /><br />
      <PrivacyDialog class="privacy-dialog">
        Allgemeine Geschäftsbedingungen und der Datenschutzerklärung
      </PrivacyDialog>
    </div>
    <div v-else>
      <Login v-if="!showRegistration" class="login" @registrationClicked="showRegistration = true" />
      <Registration v-else-if="showRegistration" class="registration" @loginClicked="showRegistration = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useUser from '~/store/useUser'

export default defineComponent({
  setup() {
    const { isAuthenticated, user, logout } = useUser()

    return {
      user,
      logout,
      isAuthenticated,
      showRegistration: ref(false)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.login,
.registration {
  max-width: 500px;
  @apply mx-auto;
}

.logout-btn {
  color: $primary;
  border: 1px solid $primary;
  @apply mt-5 rounded-full px-3 py-2 text-center cursor-pointer inline-block select-none outline-none;
}
</style>
