<template>
  <div id="wrapper">
    <h1>Bedankt!</h1>

    <div class="flex-grow"></div>

    <div id="check">
      <span class="material-icons">check_circle</span>
    </div>

    <div class="flex-grow"></div>

    <div>
      <h2 class="text-white text-center mx-4">Wilt u anderen helpen een keus te maken?</h2>

      <div id="share-btn" @click="share">Deel de tool</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'minimal',
  setup() {
    return {
      async share() {
        if (!navigator.share) {
          return
        }

        try {
          await navigator.share({
            title: 'Het Kompas',
            url: 'https://www.hetkompassliedrecht.nl/'
          })
        } catch {}
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

#wrapper {
  @apply h-full w-full flex flex-col;

  background: $primary;

  h1 {
    @apply text-center text-white pt-12;

    font-size: 28pt;
  }

  #check {
    @apply text-center;

    span {
      @apply text-white;

      font-size: min(60vw, 200px);
    }
  }

  #share-btn {
    @apply bg-white mb-8 rounded-xl text-center outline-none select-none shadow mx-auto mt-8 cursor-pointer;

    width: min(30vw, 200px);
    line-height: 50px;
    height: 50px;
    color: $primary;
  }
}
</style>
