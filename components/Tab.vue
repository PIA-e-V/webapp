<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const isActive = ref(false)

    return {
      isActive,
      setActive(active: boolean) {
        isActive.value = active
      }
    }
  }
})
</script>
