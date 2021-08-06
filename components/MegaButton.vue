<template>
  <div class="mega-button">
    <span class="material-icons mt-2" style="color:#FFDF57; font-size: 33px;">whatshot</span><br>
    <p style="line-height: normal;">
      <span style="font-size: 18px;" class="mt-2 block">{{ supTitle }}</span>
      <span style="font-size: 30px;">{{ title }}</span>
    </p>
    <AppButton
      class="forward-btn"
      icon="arrow_forward"
      background="white"
      color="#3A4090FF"
      @click="$emit('click')"
    >
      Los geht's!
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AppButton from '~/components/Button.vue'

export default defineComponent({
  components: {
    AppButton
  },
  props: {
    title: {
      type: String,
      default: () => ''
    },
    supTitle: {
      type: String,
      default: () => ''
    }
  },
  setup () {
    return {}
  }
})
</script>

<style lang="postcss" scoped>
.mega-button {
  color: white;
  background: rgba(58, 64, 144, 1);
  z-index: 10;
  width: 210px;
  height: 210px;
  text-align: center;

  @apply mx-auto rounded-full;
}

.forward-btn {
  font-size: smaller;
  margin: 1rem auto auto;
}
</style>
