<template>
  <div>
    <header>
      <BackButton />

      <h1>Worum geht's?</h1>
      <div class="short-statement">
        <span v-if="!fetchState.pending">{{ proposal.short_statement }}</span>
      </div>
    </header>

    <div class="px-4">
      <Stepper :step="2" />

      <section v-if="!fetchState.pending" class="explanation" v-html="proposal.explanation" />
    </div>

    <div v-if="!fetchState.pending" id="source">
      <Dialog :value="proposal.source_of_explanation">
        Quelle
      </Dialog>
    </div>

    <AppButton class="forward-btn" small icon="arrow_forward" @click="nextStep">
      Weiter gehts
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import AppButton from '~/components/Button.vue'
import useProposals from '~/store/useProposals'

export default defineComponent({
  components: {
    AppButton
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { currentProposal: proposal, loadProposal } = useProposals()

    const id = parseInt(route.value.params.id)
    const { fetchState } = useFetch(async () => {
      await loadProposal(id)
    })

    return {
      proposal,
      fetchState,
      nextStep () {
        router.push(`/statement/${id}/arguments`)
      }
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

.explanation {
  height: 40vh;
  color: #5e5e5e;

  @apply mt-8 bg-white px-5 py-4 overflow-scroll rounded-2xl border
}

.forward-btn {
  bottom: 60px;
  right: 10px;

  @apply absolute
}

#source {
  left: 10px;
  bottom: 65px;

  @apply absolute
}
</style>
