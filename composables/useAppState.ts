import { computed, ref } from '@nuxtjs/composition-api'

interface Waiter {
  state: 'loading'|'ready'
}

const waiters = ref<Waiter[]>([])
const isReady = computed(() => waiters.value.every(w => w.state === 'ready'))
export default function () {
  return {
    isReady,
    registerWaiter () {
      const w: Waiter = {
        state: 'loading'
      }

      waiters.value.push(w)

      return {
        setReady () {
          w.state = 'ready'
        }
      }
    }
  }
}
