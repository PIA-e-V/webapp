<template>
  <div class="h-full">
    <div class="px-4 pt-5">
      <StatementCard :item="proposal" />
    </div>

    <div class="explanation">
      <h1>Worum geht's?</h1>

      <div v-html="proposal.explanation" />
    </div>

    <div class="forward-btn">
      <Button class="mx-auto" small @click="start">Abstimmen</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { Proposal } from '~/@types/graphql-types'

export default defineComponent({
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
  @apply px-4 mt-2 pb-12 w-full overflow-x-hidden break-words;

  h1 {
    font-size: 20px;
    font-weight: 600;
  }
}

.forward-btn {
  bottom: 60px;
  @apply fixed w-full left-0;
}
</style>
