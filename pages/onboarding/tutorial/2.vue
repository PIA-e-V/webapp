<template>
  <div class="h-full">
    <img src="/onboarding/tutorial/2.png" class="mx-auto block mt-5" style="width: min(80%, 300px)" alt="Step 2" />

    <h1 class="px-4">Neuer Homescreen</h1>

    <div class="px-4 mt-4">Dein Feed besteht aus Statements, die sich in 3 Kategorien einordnen lassen.</div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="$router.push('/onboarding/tutorial/3')">
        Weiter geht's!
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'onboarding'
})
</script>

<style lang="scss" scoped>
* {
  color: white;
  @apply text-center;
}

h1 {
  font-size: 15pt;

  @apply font-bold text-center;
}

ul {
  li {
    margin-left: 30px;
  }
}

.btn-container {
  bottom: 20px;

  @apply absolute w-full;
}

.forward-btn {
  @apply block mx-auto shadow;
}
</style>
