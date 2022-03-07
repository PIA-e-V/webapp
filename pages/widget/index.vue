<template>
  <div id="wrapper">
    <h1>Vergelijk partijen</h1>

    <div class="flex-grow"></div>

    <div id="parties">
      <div class="row">
        <div class="party">
          <img src="/parties/CDA.svg" alt="CDA" />
        </div>
        <div class="party">
          <img src="/parties/prosliedrecht.jpeg" alt="PROsliedrecht" />
        </div>
        <div class="party">
          <img src="/parties/VVD.svg" alt="VVD" />
        </div>
        <div class="party">
          <img src="/parties/SGP.svg" alt="SGP" />
        </div>
      </div>
      <div class="row">
        <div class="party">
          <img src="/parties/PvdA.svg" alt="PvdA" />
        </div>
        <div class="party">
          <img src="/parties/D66.svg" alt="D66" />
        </div>
        <div class="party">
          <img src="/parties/Slydrecht.NU.png" alt="Slydrecht.NU" />
        </div>
      </div>
    </div>

    <div class="flex-grow"></div>

    <div>
      <div id="start-btn" @click="$router.push('/widget/statements')">Start</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'minimal'
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

  #parties {
    @apply mx-auto;
    width: min(80vw, 500px);

    .row {
      @apply flex mx-auto justify-center;

      .party {
        @apply rounded-full bg-white flex mx-1;
        height: 80px;
        aspect-ratio: 1/1;

        img {
          @apply m-auto overflow-visible;
          max-width: 80%;
          max-height: 80%;
        }
      }
    }
  }

  #start-btn {
    @apply bg-white mb-8 rounded-xl text-center outline-none select-none shadow mx-auto mt-8 cursor-pointer;

    width: min(30vw, 200px);
    line-height: 50px;
    height: 50px;
    color: $primary;
  }
}
</style>
