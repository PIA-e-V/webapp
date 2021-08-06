<template>
  <section class="stepper">
    <div v-for="i in [1,2,3,4,5]" :key="i">
      <div class="step" :class="{ active: step >= i }" @click="onStepSelected(i)">
        {{ i }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import useProposals from '~/store/useProposals'

type Step = 1|2|3|4|5

export default defineComponent({
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  setup () {
    const router = useRouter()
    const { currentProposal } = useProposals()

    return {
      onStepSelected (step: Step) {
        if (!currentProposal.value) {
          return
        }

        switch (step) {
          case 1: router.push(`/statement/${currentProposal.value.id}`); break
          case 2: router.push(`/statement/${currentProposal.value.id}/explanation`); break
          case 3: router.push(`/statement/${currentProposal.value.id}/arguments`); break
          case 4: router.push(`/statement/${currentProposal.value.id}/voting`); break
          case 5: router.push(`/statement/${currentProposal.value.id}/result`); break
        }
      }
    }
  }
})
</script>

<style>
.stepper {
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr 1fr;

  @apply mt-10
}

.stepper > div {
  @apply text-center
}

.stepper .step {
  width: 25px;
  height: 25px;

  @apply m-auto font-bold rounded shadow-outline bg-white font-black cursor-pointer
}

.stepper .step.active {
  background: #3A4090;
  color: white;
}
</style>
