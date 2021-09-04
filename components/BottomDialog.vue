<template>
  <div v-if="value" class="bottom-dialog-container" @click="$emit('update:value', false)">
    <div class="content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: () => true
    }
  }
})
</script>

<style lang="scss" scoped>
.bottom-dialog-container {
  height: calc(var(--vh, 1vh) * 100);
  background: rgba(0, 0, 0, 0.5);

  @apply absolute top-0 left-0 w-full z-30;
}

.bottom-dialog-container .content {
  @apply bg-white absolute bottom-0 left-0 w-full rounded-t-xl p-4;
}
</style>
