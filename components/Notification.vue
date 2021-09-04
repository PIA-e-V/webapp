<template>
  <div>
    <transition name="fade">
      <div v-if="active" id="notification" :class="type">
        <div>
          <div class="inline-block" style="width: calc(100% - 40px)">
            {{ message }}
          </div>
          <div id="close-btn" @click="close">
            <span class="material-icons">close</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useNotifications from '~/composables/useNotifications'

export default defineComponent({
  setup() {
    const { active, message, type, close } = useNotifications()

    return {
      active,
      message,
      type,
      close
    }
  }
})
</script>

<style lang="scss" scoped>
#notification {
  left: 10px;
  bottom: 60px;
  width: calc(100% - 20px);
  max-width: 400px;

  @apply absolute rounded text-white p-2;
}

#notification #close-btn {
  width: 24px;
  height: 24px;

  @apply float-right cursor-pointer text-center outline-none;
}

#notification.info {
  background: #5f96e8;
}

#notification.warning {
  background: #ffdf57;
}

#notification.error {
  background: #fa6751;
}

#notification.success {
  background: #26e291;
}
</style>
