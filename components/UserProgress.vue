<template>
  <div class="user-progress">
    <div class="progress-bar-container">
      <section class="progress" :style="`width: ${value}%`" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: () => 0
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.user-progress {
  @apply mx-auto mt-2;

  .progress-bar-container {
    border: 1px solid gray;

    @apply mx-auto rounded-full;
  }

  .progress {
    height: 15px;
    background: $primary;
    transition: width 1s;
    transition-timing-function: ease-out;

    @apply rounded-full;
  }
}
</style>
