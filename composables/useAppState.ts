import { computed, readonly, ref } from '@nuxtjs/composition-api'

const state = ref<'loading'|'ready'>('loading')
const isReady = computed(() => state.value === 'ready')
export default function () {
  return {
    state: readonly(state),
    isReady,
    setReady () {
      state.value = 'ready'
    }
  }
}
