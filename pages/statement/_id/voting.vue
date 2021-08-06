<template>
  <div>
    <header>
      <BackButton />

      <h1>Abstimmung</h1>
      <div class="short-statement">
        <span v-if="!fetchState.pending">{{ proposal.short_statement }}</span>
      </div>
    </header>

    <div class="px-4">
      <Stepper :step="4" />

      <DecisionCard
        v-if="fetchState.timestamp"
        :value="proposal.statement"
        :decisions="[
          { label: 'Dagegen', result: 'DISAGREE', icon: 'close' },
          { label: 'Neutral', result: 'NEUTRAL', icon: 'thumbs_up_down' },
          { label: 'Dafür', result: 'AGREE', icon: 'favorite' }
        ]"
        @decision="save"
      />
    </div>

    <AppButton
      class="forward-btn"
      small
      icon="arrow_forward"
      @click="$router.push(`/statement/${proposal.id}/result`)"
    >
      Überspringen
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import DecisionCard from '~/components/DecisionCard.vue'
import useProposals from '~/store/useProposals'
import useGraphql from '~/composables/useGraphql'

export default defineComponent({
  components: {
    Stepper,
    DecisionCard,
    AppButton
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const client = useGraphql()
    const { currentProposal: proposal, loadProposal } = useProposals()

    const id = parseInt(route.value.params.id)
    const { fetchState } = useFetch(async () => {
      await loadProposal(id)
    })

    async function save (result: string) {
      const operation: IQueryBuilderOptions = {
        operation: 'upsertOpinion',
        variables: {
          input: {
            type: 'UpsertOpinionInput',
            required: true,
            value: {
              opinionable_id: proposal.value!.id,
              opinionable_type: 'App\\Models\\Proposal',
              position: result
            }
          }
        },
        fields: ['id']
      }

      const q = mutation(operation)
      const { upsertOpinion } = await client.mutation(q.query, q.variables)

      if (upsertOpinion) {
        router.push('result')
      } else {
        console.log('Alarm')
      }
    }

    return {
      proposal,
      fetchState,
      save
    }
  }
})
</script>

<style lang="postcss" scoped>
header {
  height: 150px;
  background: #3A4090;
}

header h1 {
  color: white;
  font-size: 20pt;
  font-family: 'Bree Serif';

  @apply pt-8 font-bold text-center
}

.short-statement {
  color: white;

  @apply text-center font-light px-3
}

.forward-btn {
  bottom: 60px;
  right: 10px;

  @apply absolute
}

.forward-btn {
  bottom: 60px;
  right: 10px;
  background: rgba(65, 60, 177, 0.66);

  @apply absolute
}
</style>
