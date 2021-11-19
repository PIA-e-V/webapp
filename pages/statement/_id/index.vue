<template>
  <div class="h-full">
    <div class="px-4 pt-5">
      <StatementCard :item="statement" />
    </div>

    <div class="explanation">
      <h1>Worum geht's?</h1>

      <div v-html="statement.explanation" />
    </div>

    <div class="forward-btn">
      <Button class="mx-auto" small @click="start">Abstimmen</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { Statement } from '~/@types/graphql-types'

export default defineComponent({
  props: {
    statement: {
      type: Object as PropType<Statement>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', 1)

    const router = useRouter()

    return {
      start() {
        router.push(
          `/statement/${props.statement.id}/${props.statement.arguments.length > 0 ? 'arguments' : 'proposal'}`
        )
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
