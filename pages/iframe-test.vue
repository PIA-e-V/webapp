<template>
  <div class="h-full">
    <h1>Iframe example</h1>

    <iframe src="http://ftv.localhost/widget"></iframe>
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
  height: 700px;
  width: 400px;
  border: 1px solid black;
}
</style>
