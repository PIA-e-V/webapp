<template>
  <div class="h-full">
    <img src="/onboarding/new-version.png" class="mx-auto block mt-5" style="height: 30vh" alt="Update" />

    <div class="mt-5 px-4">
      <h1>Was passiert nach der Wahl?</h1>
      <p class="mt-2">
        Am 27. September werden wir ein neues Update veröffentlichen. Du wirst dann die wichtigsten politischen
        Nachrichten, Gesetze und Petitionen verfolgen und darüber abstimmen können.
      </p>
    </div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="$router.push('/')">
        Weiter geht's!
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'onboarding',
  setup() {
    const router = useRouter()

    onMounted(() => {
      localStorage.setItem('onboarding.new-version', '1')
    })

    return {
      async proceedWithoutLogin() {
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

  .forward-btn {
    @apply block mx-auto shadow;
  }
}
</style>
