<template>
  <div>
    <transition name="fade">
      <div v-if="showDialog" id="dialog">
        <div id="dialog-content">
          <span v-html="value" />
          <span class="close-icon" @click="toggleDialog">
            <span class="material-icons">close</span>
          </span>
        </div>
      </div>
    </transition>

    <span class="trigger" @click="toggleDialog"><slot /></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      required: true,
      type: String
    }
  },
  setup () {
    const showDialog = ref(false)

    function toggleDialog () {
      showDialog.value = !showDialog.value
    }

    return {
      showDialog,
      toggleDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.trigger {
  color: black;

  @apply underline cursor-pointer
}

#dialog {
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.4);

  @apply top-0 left-0 fixed

}

#dialog-content {
  z-index: 20;
  border: 1px solid lightgrey;
  padding: 20px 26px 40px;
  top: 5vh;
  max-height: 90vh;
  left: calc(50% - min(500px, 80vw) * 0.5);
  width: min(500px, 80vw);
  word-break: break-word;

  @apply absolute bg-white rounded-2xl shadow-2xl overflow-scroll
}

.close-icon {
  @apply top-0 right-0 cursor-pointer absolute mr-2 mt-2
}
</style>
