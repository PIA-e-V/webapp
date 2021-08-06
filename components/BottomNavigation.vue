<template>
  <nav>
    <div class="m-auto">
      <section class="btn" :class="{active: $route.name === 'index'}" @click="$router.push('/')">
        <span class="material-icons">home</span>
      </section>
      <section class="btn" :class="{active: $route.name === 'profile'}" @click="$router.push('/profile')">
        <span class="material-icons">person</span>
      </section>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="postcss" scoped>
nav {
  height: 50px;
  width: 100%;
  background: #f5f5f5;
}

nav > div {
  width: fit-content;
}

nav > div > section.btn {
  /*background: #eaeaea;*/
  height: 40px;
  width: 40px;
  margin-top: 5px;
  color: grey;

  @apply inline-block rounded-full text-center mx-12 cursor-pointer
}

nav > div > section.btn.active {
  color: black;
}

nav > div > section.btn span {
  line-height: 40px;
}
</style>
