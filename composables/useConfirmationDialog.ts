import { readonly, ref, watch } from '@nuxtjs/composition-api'

const dialogSuccess = ref<boolean>(false)
const dialogVisible = ref<boolean>(false)
const dialogTitle = ref('')
const dialogContent = ref('')

export default function () {
  function close (success: boolean) {
    dialogSuccess.value = success
    dialogVisible.value = false
  }

  return {
    visible: readonly(dialogVisible),
    title: readonly(dialogTitle),
    content: readonly(dialogContent),
    confirm (title: string, content: string) {
      dialogTitle.value = title
      dialogContent.value = content
      dialogVisible.value = true

      return new Promise((resolve) => {
        const stopHandle = watch(dialogVisible, () => {
          resolve(dialogSuccess.value)
          stopHandle()
        })
      })
    },
    cancel () {
      close(false)
    },
    submit () {
      close(true)
    }
  }
}
