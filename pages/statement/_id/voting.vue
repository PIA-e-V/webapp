<template>
  <div>
    <p class="short-statement px-4">{{ statement.short_statement }}</p>

    <p class="px-4 mt-8">So hat die Community abgestimmt.</p>

    <div v-if="scores" class="px-4 my-2">
      <VotingResult
        header="Community Voting in %"
        :results="[
          { label: 'Ja', color: '#00EA8E', value: scores.agreePercent },
          { label: 'Nein', color: '#FF3440', value: scores.disagreePercent },
          { label: 'Enhalten', color: '#FFCA33', value: scores.neutralPercent }
        ]"
      />
    </div>

    <div v-if="statement.yes_petition || statement.no_petition" class="px-4">
      <hr class="my-4" />

      Dieses Statement bezieht sich auf eine aktuelle Petition. Wenn du mehr über die Petition erfahren, oder sie
      unterzeichnen möchtest, klicke hier:
    </div>

    <div v-if="statement.yes_petition" class="px-4 mt-4">
      <button class="primary" @click="openLink(statement.yes_petition)">Zur Petition</button>
    </div>

    <div v-if="statement.no_petition" class="px-4 mt-4">
      <button class="primary" @click="openLink(statement.no_petition)">Zur Petition</button>
    </div>

    <Button small class="forward-btn" icon="arrow_forward" @click="$router.push('/profile/political')">
      Zum Profil
    </Button>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
import useGraphql from '~/composables/useGraphql'
import { Statement, StatementScore } from '~/@types/graphql-types'

export default defineComponent({
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
      const q = `query ($id: Int!) { communityScore(id: $id) { agreePercent, disagreePercent, neutralPercent } }`
      const { communityScore } = await client.query(q, { id: props.statement.id })

      if (communityScore) {
        scores.value = communityScore
      }
    })

    return {
      scores,
      fetchState,
      openLink(url: string) {
        const w = window.open(url, '_blank')
        w?.focus()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.short-statement {
  font-size: 20px;
  font-weight: 500;
  @apply pt-2 outline-none select-none;
}

h2 {
  @apply font-bold;
}

.forward-btn {
  bottom: 10px;
  left: calc(50% - 50px);

  @apply absolute;
}

button {
  @apply block text-center w-full py-1 text-black rounded-full outline-none px-2;

  &.primary {
    background: $primary;

    @apply text-white;
  }
}
</style>
