<template>
  <div class="h-full flex flex-col">
    <header>
      <h1 class="pt-1 mb-2 text-center">Parteimatching</h1>

      <PoliticalProfile />
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useUser from '~/store/useUser'

export default defineComponent({
  layout: 'minimal',
  setup() {
    const { user } = useUser()

    return {
      user,
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
