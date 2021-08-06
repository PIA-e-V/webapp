<template>
  <div class="h-full">
    <img src="/onboarding/initial_onboarding/2.png" class="mx-auto block mt-5" style="width: min(80%, 300px)" alt="Step 1">

    <h1>Lerne etwas über echte Gesetze!</h1>
    <h2>#FollowTheLaws</h2>

    <div class="px-4">
      In den letzten vier Jahren wurden viele Gesetze im Bundestag verändert, besprochen oder verabschiedet.
      Lerne mit uns die wichtigsten davon kennen!
    </div>

    <div class="btn-container">
      <Button
        class="forward-btn"
        icon="arrow_forward"
        background="white"
        color="#3A4090FF"
        @click="$router.push('/onboarding/3')"
      >
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

<style lang="postcss" scoped>
* {
  color: white;

  @apply text-center
}

h1 {
  font-size: 15pt;

  @apply font-bold;
}

h2 {
  color: #FFDF57;
  font-size: 15pt;

  @apply font-bold;
}

.btn-container {
  bottom: 20px;

  @apply absolute w-full;
}

.forward-btn {
  @apply block mx-auto shadow
}
</style>
