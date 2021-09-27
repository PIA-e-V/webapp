<template>
  <div>
    <h1 class="text-center">Verifiziere E-Mail Adresse ...</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, useRoute, useRouter } from '@nuxtjs/composition-api'
import useUser from '~/store/useUser'
import useNotifications from '~/composables/useNotifications'

export default defineComponent({
  layout: 'header',
  setup() {
    const route = useRoute()
    const { success, error } = useNotifications()
    const { verify } = useUser()
    const router = useRouter()

    onBeforeMount(async () => {
      const verified = await verify(route.value.params.token)
      if (verified) {
        success('Deine E-Mail Adresse wurde verifiziert')
      } else {
        error('Deine E-Mail Adresse konnte nicht verifiziert werden')
      }

      router!.push('/profile/account')
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
.statements {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  scrollbar-width: none; /* Firefox */
}

.statements::-webkit-scrollbar {
  display: none;
}

.see-all-btn {
  @apply shadow px-3 font-medium bg-white float-right mr-3;
}
</style>
