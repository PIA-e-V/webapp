<template>
  <div v-if="visible" class="z-40 w-full h-full absolute top-0 left-0" style="background: rgba(0, 0, 0, 0.5)">
    <div id="confirmation-dialog" class="z-50">
      <h2 class="font-bold mb-2">
        {{ title }}
      </h2>

      <span>{{ content }}</span>

      <div class="mb-12" />

      <Button
        small
        class="absolute"
        style="bottom: 20px;"
        @click="submit"
      >
        Okay
      </Button>
      <Button
        small
        class="absolute border-"
        background="white"
        color="black"
        style="bottom: 20px; right: 20px"
        @click="cancel"
      >
        Abbrechen
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useConfirmationDialog from '~/composables/useConfirmationDialog'

export default defineComponent({
  setup () {
    const { visible, title, content, cancel, submit } = useConfirmationDialog()

    return {
      visible,
      title,
      content,
      cancel,
      submit
    }
  }
})
</script>

<style scoped>
#confirmation-dialog {
  top: 20%;
  left: calc(50% - min(45%, 200px));
  width: 90%;
  max-width: 400px;

  @apply bg-white absolute rounded-xl p-5
}
</style>
