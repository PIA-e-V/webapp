<template>
  <section class="stepper">
    <div v-for="i in [1, 2, 3, 4]" :key="i" class="step">
      <div class="step-content" :class="{ active: step >= i }"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useProposals from '~/store/useProposals'

type Step = 1 | 2 | 3 | 4 | 5

export default defineComponent({
  props: {
    step: {
      type: Number,
      default: 1
    }
  }
})
</script>

<style lang="scss">
@import '/assets/_variables.scss';

.stepper {
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr;

  .step {
    @apply text-center;

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
