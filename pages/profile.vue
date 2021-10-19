<template>
  <div class="h-full flex flex-col">
    <header>
      <h1 class="pt-1 mb-2 text-center">Profil</h1>

      <Tabs>
        <Tab title="Politisch">
          <PoliticalProfile />
        </Tab>
        <Tab title="Account">
          <div class="pt-5">
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
              <Registration
                v-else-if="showRegistration"
                class="registration"
                @loginClicked="showRegistration = false"
              />

              <h2 class="mt-4 mb-2">Feedback</h2>
              <p>
                Hast du Feedback oder Verbesserungsvorschläge für FollowTheVote? Dann schreib uns an:
                <a href="mailto:info@followthevote.com?subject=Feedback">info@followthevote.com</a>
              </p>
            </div>
          </div>
        </Tab>
      </Tabs>
    </header>
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
