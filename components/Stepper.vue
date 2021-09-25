<template>
  <section class="stepper">
    <div v-for="i in stepArray" :key="i" class="step">
      <div class="step-content" :class="{ active: step >= i }"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    steps: {
      type: Number,
      default: 4
    },
    step: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    return {
      stepArray: computed(() => Array.from({ length: props.steps }, (_, i) => i + 1))
    }
  }
})
</script>

<style lang="scss">
@import '/assets/_variables.scss';

.stepper {
  @apply flex flex-row;

  .step {
    @apply text-center flex-grow;

    .step-content {
      width: 60%;
      height: 5px;
      border-radius: 10px;
      background: #e7e7e7;
      @apply m-auto;

      &.active {
        background: $primary;
      }
    }
  }
}
</style>
