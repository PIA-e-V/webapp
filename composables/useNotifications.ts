import { readonly, ref } from '@nuxtjs/composition-api'

type MessageType = 'info'|'warning'|'error'|'success'

const props = {
  active: ref(false),
  message: ref(''),
  type: ref<MessageType>('info')
}
const timeout = 5000
let timeoutHandler: number|undefined

export default function () {
  function reset () {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler)
    }

    props.active.value = false
    props.message.value = ''
    props.type.value = 'info'
  }

  function notify (message: string, type: MessageType = 'info') {
    props.message.value = message
    props.type.value = type

    props.active.value = true

    timeoutHandler = window.setTimeout(() => {
      reset()
    }, timeout)
  }

  return {
    active: readonly(props.active),
    message: readonly(props.message),
    type: readonly(props.type),
    close () {
      reset()
    },
    info: (message: string) => notify(message, 'info'),
    error: (message: string) => notify(message, 'error'),
    warning: (message: string) => notify(message, 'warning'),
    success: (message: string) => notify(message, 'success')
  }
}
