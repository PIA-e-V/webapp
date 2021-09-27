<template>
  <div class="h-full">
    <img src="/onboarding/tutorial/3.png" class="mx-auto block mt-5" style="width: min(80%, 300px)" alt="Step 3" />

    <h1 class="px-4">1. Anträge</h1>

    <div class="px-4 mt-4">
      Hier kannst du dich über die wichtigsten & neuesten Debatten im Parlament informieren.<br /><br />
      Bilde dir eine Meinung und stimme selbst darüber ab!
    </div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="$router.push('/onboarding/tutorial/4')">
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

  @apply font-bold px-2;
}

h2 {
  color: #ffdf57;
  font-size: 15pt;

  @apply font-bold;
}

.btn-container {
  bottom: 20px;

  @apply absolute w-full;
}

.forward-btn {
  @apply block mx-auto shadow;
}
</style>
