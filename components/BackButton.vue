<template>
  <div id="back-btn" @click="goBack">
    <span class="material-icons">arrow_back</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    path: {
      type: String,
      default: () => '',
      required: false
    },
    disableNavigation: {
      type: Boolean,
      defailt: () => false
    }
  },
  setup (props, ctx) {
    const router = useRouter()

    return {
      goBack () {
        if (props.disableNavigation) {
          ctx.emit('click')
          return
        }

        if (props.path) {
          router.push(props.path)
        } else {
          router.go(-1)
        }
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
#back-btn {
  width: 25px;
  height: 25px;
  line-height: 25px;
  top: 42px;
  left: 20px;
  color: #3A4090FF;
  outline: none;
  user-select: none;

  @apply m-auto font-bold rounded shadow bg-white font-black cursor-pointer text-center absolute p-0
}

#back-btn span {
  font-size: 10pt;
  outline: none;
  user-select: none;
}
</style>
