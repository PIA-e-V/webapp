<template>
  <div class="h-full">
    <img src="/icon_transparent.png" class="mx-auto block mt-5" style="width: min(50%, 200px)" alt="Step 1" />

    <h1>Deine Dosis Demokratie</h1>
    <h2>#FollowTheVote</h2>

    <div class="px-4">
      Jeden Tag ein neues Thema - in nur 5 Minuten. Denn Wahlen sind alle vier Jahre, aber Demokratie ist jeden Tag!
    </div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="start"> Los geht's! </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'onboarding',
  setup() {
    const router = useRouter()

    return {
      start() {
        localStorage.setItem('onboarding.initial', '1')

        router!.push('/')
      }
    }
  }
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
