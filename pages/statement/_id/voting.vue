<template>
  <div>
    <p class="short-statement px-4">{{ statement.short_statement }}</p>

    <div class="px-4 my-2" v-for="(res, i) in results" :key="i">
      <VotingResult :header="res.header" :results="res.results" />
    </div>

    <AppButton small class="forward-btn" icon="arrow_forward" @click="$router.push('/profile/political')">
      Zum Profil
    </AppButton>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import AppButton from '~/components/Button.vue'
import useGraphql from '~/composables/useGraphql'
import { Statement } from '~/@types/graphql-types'
import { VotingResult } from '~/components/VotingResult.vue'

interface Result {
  header: string
  subtitle: string
  results: VotingResult[]
}

export default defineComponent({
  components: {
    AppButton
  },
  props: {
    statement: {
      type: Object as PropType<Statement>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', props.statement.arguments.length > 0 ? 4 : 3)

    const client = useGraphql()

    const results = ref<Result[]>([])

    useFetch(async () => {})

    return {
      results
    }
  }
})
</script>

<style lang="scss" scoped>
.short-statement {
  font-size: 20px;
  font-weight: 500;
  @apply pt-2;
}

h2 {
  @apply font-bold;
}

.forward-btn {
  bottom: 10px;
  left: calc(50% - 50px);

  @apply absolute;
}
</style>
