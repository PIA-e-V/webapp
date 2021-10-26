<template>
  <div class="btn" :class="{ small: small }" :style="{ background, color }" @click="$emit('click', $event)">
    <span class="slot" :style="{ color }" :class="{ 'mr-2': !icon, 'ml-2': Object.keys($slots).length > 0 }">
      <slot />
    </span>
    <div v-if="icon" class="icon">
      <span class="material-icons">{{ icon }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: () => ''
    },
    small: {
      type: Boolean,
      default: () => false
    },
    background: {
      type: String,
      default: () => '#3A4090'
    },
    color: {
      type: String,
      default: () => 'white'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.btn {
  width: fit-content;
  border: none;
  @apply rounded-2xl px-1 font-bold cursor-pointer flex items-center outline-none select-none;

  .slot {
    line-height: 40px;
    display: inline-block;
    border: none;
    @apply inline-block whitespace-no-wrap outline-none select-none;
  }

  .icon {
    border: none;
    outline: none;
    user-select: none;

    @apply inline-block ml-2 mr-1;
  }

  .material-icons {
    line-height: 40px;
  }

  &.small {
    height: 30px;
    font-weight: 600;

    .slot {
      line-height: 30px;
      font-size: 13px;
    }

    .material-icons {
      line-height: 30px;
      font-size: 16px;
    }
  }
}
</style>
