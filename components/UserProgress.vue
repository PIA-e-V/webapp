<template>
  <div class="progress-container">
    <span class="heading">Fortschritt</span>

    <div class="user-progress">
      <div class="progress-bar-container" style="width: 90%">
        <section class="progress" :style="`width: ${value}%`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: () => 0
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.progress-container {
  width: min(90vw, 400px);

  @apply mx-auto mb-2 p-2;
}

.progress-container .heading {
  font-family: 'Bree Serif', serif;
  font-size: 18pt;
  font-weight: 500;
}

.user-progress {
  @apply shadow rounded mx-auto mt-2 p-4 bg-white;
}

.user-progress .progress-bar-container {
  border: 1px solid black;

  @apply mx-auto rounded-full;
}

.user-progress .progress-bar-container .progress {
  height: 15px;
  background: $primary;
  transition: width 1s;
  transition-timing-function: ease-out;

  @apply rounded-full;
}
</style>
