<template>
  <div
    class="btn"
    :class="{ small: small, disabled: disabled }"
    :style="{ background, color }"
    @click="$emit('click', $event)"
  >
    <span class="slot" :style="{ color }" :class="{ 'mr-2': !icon, 'ml-2': Object.keys($slots).length > 0 }">
      <slot />
    </span>
    <div v-if="icon" class="icon" :class="{ 'ml-2': hasContent, 'ml-1': !hasContent }">
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
    disabled: {
      type: Boolean,
      default: () => false
    },
    background: {
      type: String,
      default: () => '#F76B30'
    },
    color: {
      type: String,
      default: () => 'white'
    }
  },
  setup(_props, ctx) {
    return {
      hasContent: !!ctx.slots.default
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.btn {
  width: fit-content;
  border: 1px solid $primary;
  @apply rounded-full px-1 font-bold cursor-pointer flex items-center outline-none select-none;

  &.disabled {
    background: white !important;
    cursor: default !important;

    .material-icons {
      color: $primary;
    }
  }

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

    @apply inline-block mr-1;
  }

  .material-icons {
    line-height: 40px;
  }

  &.small {
    height: 34px;
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
