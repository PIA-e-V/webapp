<template>
  <img class="spinner" :style="{ width: size }" src="/logo_plain.svg" alt="Loading spinner" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    size: {
      type: String,
      default: () => '24px'
    }
  }
})
</script>

<style lang="scss" scoped>
.spinner {
  animation: spin 3s infinite;
  transform-origin: 50% 50%;
  aspect-ratio: 1 / 1;
}
</style>
