<template>
  <div class="h-full">
    <h1>Iframe example</h1>

    <iframe src="https://sliedrecht.followthevote.com/widget"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'empty',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
iframe {
  height: 450px;
  width: 100%;
  border: 1px solid black;
}
</style>
