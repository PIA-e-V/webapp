<template>
  <nav>
    <div class="m-auto">
      <section class="btn" :class="{ active: $route.name === 'index' }" @click="$router.push('/')">
        <span class="material-icons">how_to_vote</span>
        <p class="-mt-2">Anträge</p>
      </section>
      <section class="btn" :class="{ active: $route.name === 'profile' }" @click="$router.push('/profile')">
        <span class="material-icons" style="transform: rotate(90deg)">bar_chart</span>
        <p class="-mt-2">Profil</p>
      </section>
    </div>
  </nav>
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
nav {
  height: 80px;
  border-top: 1px solid #cccccc;
  @apply bg-white w-full;

  & > div {
    width: fit-content;

    & > section.btn {
      height: 40px;

      @apply inline-block rounded-full text-center mx-12 cursor-pointer;
    }
  }
}

nav > div > section.btn.active {
  color: black;
}
</style>
