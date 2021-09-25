<template>
  <div>
    <div class="px-4 pt-5">
      <StatementCard :proposal="proposal" />
    </div>

    <div class="explanation">
      <h1>Worum geht's?</h1>

      <div v-html="proposal.explanation" />

      <!--      <h1 class="mt-2">Quellen</h1>-->

      <!--      <div v-html="proposal.source_of_explanation" />-->
    </div>

    <AppButton class="forward-btn" small @click="start">Voten</AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import AppButton from '~/components/Button.vue'
import { Proposal } from '~/@types/graphql-types'

export default defineComponent({
  components: {
    AppButton
  },
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', 1)

    const router = useRouter()

    return {
      start() {
        router.push(`/proposal/${props.proposal.id}/arguments`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.explanation {
  @apply px-4 mt-2 mb-12 w-full overflow-x-hidden break-words;

  h1 {
    font-size: 20px;
    font-weight: 600;
  }
}

.forward-btn {
  bottom: 10px;
  @apply sticky m-auto;
}
</style>
