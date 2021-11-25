<template>
  <div class="disclaimer">
    <p v-if="longDisclaimer" v-html="disclaimer.long_text" />
    <p v-else v-html="disclaimer.short_text" />

    <p v-if="disclaimer.long_text">
      <span @click="longDisclaimer = !longDisclaimer">{{ longDisclaimer ? 'weniger' : 'mehr' }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { Disclaimer } from '~/@types/graphql-types'

export default defineComponent({
  props: {
    disclaimer: {
      type: Object as PropType<Disclaimer>,
      required: true
    }
  },
  setup() {
    return {
      longDisclaimer: ref(false)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.disclaimer {
  border: 2px solid $light-blue;
  @apply px-2 pt-1 my-2 rounded-md select-none outline-none;

  p:last-child {
    @apply text-right underline select-none outline-none mb-1;

    span {
      @apply cursor-pointer select-none outline-none;
    }
  }
}
</style>
