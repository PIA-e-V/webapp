<template>
  <div class="h-full flex flex-col">
    <div class="flex pt-2 mb-3">
      <div class="flex flex-col flex-grow">
        <img src="/logo-sliedrecht.svg" style="height: 50px" class="my-2" alt="Het Kompas Logo" />
      </div>
    </div>

    <header>
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
