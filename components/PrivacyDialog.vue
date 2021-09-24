<template>
  <Dialog class="privacy-dialog" :value="privacyText">
    <slot />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import usePrivacy from '~/composables/usePrivacy'

export default defineComponent({
  setup() {
    const { privacyText } = usePrivacy()
    return {
      privacyText
    }
  }
})
</script>

<style lang="scss">
@import '/assets/_variables.scss';

.privacy-dialog {
  #dialog-content {
    h1,
    h2,
    h3,
    p {
      @apply my-2;
    }

    h2 {
      font-size: 16pt;
    }

    h3 {
      font-size: 14pt;
    }
  }

  .trigger {
    color: $primary;
  }
}
</style>
