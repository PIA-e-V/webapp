<template>
  <div class="h-full">
    <img src="/onboarding/tutorial/6.png" class="mx-auto block mt-5" style="width: min(80%, 300px)" alt="Step 5" />

    <h1 class="px-4">3. Petitionen</h1>

    <div class="px-4 mt-5">
      Schon bald stellen wir dir differenziert die wichtigsten, aktuell laufenden Petitionen vor.<br /><br />
      Bilde dir eine Meinung und positioniere dich dafür oder dagegen!
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
        localStorage.setItem('onboarding.tutorial', '1')

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

.btn-container {
  bottom: 20px;

  @apply absolute w-full;
}

.forward-btn {
  @apply block mx-auto shadow;
}
</style>
