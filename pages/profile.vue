<template>
  <div>
    <header>
      <h1>Profil</h1>

      <div id="tabs">
        <div
          class="tab"
          :class="{ active: $route.name === 'profile-political' }"
          @click="$router.push('/profile/political')"
        >
          Politisch
        </div>
        <div
          class="tab"
          :class="{ active: $route.name === 'profile-account' }"
          @click="$router.push('/profile/account')"
        >
          Account
        </div>
      </div>
    </header>

    <NuxtChild />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

header {
  h1 {
    font-size: 20pt;

    @apply pt-1 mb-4 font-bold text-center;
  }

  #tabs {
    @apply flex flex-row;

    .tab {
      font-size: 20px;
      color: #575a6d;
      @apply flex-grow text-center pb-2 cursor-pointer;

      &.active {
        color: $primary;
        border-bottom: 2px solid $primary;
      }
    }
  }
}
</style>
