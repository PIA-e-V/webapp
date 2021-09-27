<template>
  <div class="h-full">
    <img src="/onboarding/tutorial/4.png" class="mx-auto block mt-5" style="width: min(80%, 300px)" alt="Step 4" />

    <h1 class="px-4">...matche anschließend mit Parteien.</h1>

    <div class="px-4 mt-5">
      Dein politisches Profil wird auf Grundlage der Anträge im Bundestag erstellt.<br /><br />
      Gewichte Themen und finde heraus welche Partei am besten zu dir passt.
    </div>

    <div class="btn-container">
      <Button class="forward-btn" background="white" color="#3A4090FF" @click="$router.push('/onboarding/tutorial/5')">
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
