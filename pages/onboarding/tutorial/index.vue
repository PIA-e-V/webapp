<template>
  <div class="h-full">
    <img src="/onboarding/tutorial/1.png" class="mx-auto block mt-5" style="width: min(80%, 450px)" alt="Step 1" />

    <div class="px-4 mb-4">
      <h1>Nach der Wahl ist vor der Wahl!</h1>
      <h2>Deutschland macht ein Update - die FollowTheVote App auch.</h2>
    </div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="$router.push('/onboarding/tutorial/2')">
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

  @apply font-bold;
}

h2 {
  color: #ffdf57;
  font-size: 12pt;
}

.btn-container {
  bottom: 20px;

  @apply absolute w-full;
}

.forward-btn {
  @apply block mx-auto shadow;
}
</style>
