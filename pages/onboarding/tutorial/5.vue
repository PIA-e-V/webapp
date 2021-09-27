<template>
  <div class="h-full">
    <img src="/onboarding/tutorial/5.png" class="mx-auto block mt-5" style="width: min(80%, 300px)" alt="Step 5" />

    <h1 class="px-4">2. News</h1>

    <div class="px-4 mt-5">
      Hier versorgen wir dich täglich mit den neuesten politischen Nachrichten.<br /><br />
      Gib deine Meinung dazu ab & vergleiche, wie die FollowTheVote Community gestimmt hat.
    </div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="$router.push('/onboarding/tutorial/6')">
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

.btn-container {
  bottom: 20px;

  @apply absolute w-full;
}

.forward-btn {
  @apply block mx-auto shadow;
}
</style>
