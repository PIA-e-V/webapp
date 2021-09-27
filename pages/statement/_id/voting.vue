<template>
  <div>
    <p class="short-statement px-4">{{ statement.short_statement }}</p>

    <p class="px-4 mt-8">So hat die Community abgestimmt.</p>

    <div v-if="scores" class="px-4 my-2">
      <VotingResult
        header="Community Voting"
        :results="[
          { label: 'Ja', color: '#00EA8E', value: scores.agreeCount },
          { label: 'Nein', color: '#FF3440', value: scores.disagreeCount },
          { label: 'Enhalten', color: '#FFCA33', value: scores.neutralCount }
        ]"
      />
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
import { Statement, StatementScore } from '~/@types/graphql-types'

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

    const scores = ref<StatementScore | null>(null)
    const { fetchState } = useFetch(async () => {
      const q = `query ($id: Int!) { communityScore(id: $id) { agreeCount, disagreeCount, neutralCount } }`
      const { communityScore } = await client.query(q, { id: props.statement.id })

      if (communityScore) {
        scores.value = communityScore
      }
    })

    return {
      scores,
      fetchState
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
