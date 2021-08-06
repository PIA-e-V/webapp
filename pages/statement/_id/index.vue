<template>
  <div>
    <header>
      <BackButton />

      <h1>Statement</h1>
      <div class="short-statement">
        <span v-if="!fetchState.pending">{{ proposal.short_statement }}</span>
      </div>
    </header>

    <div class="px-4">
      <Stepper />

      <transition name="fade">
        <Statement v-if="!fetchState.pending && proposal" :proposal="proposal" />
      </transition>
    </div>

    <transition name="fade">
      <div v-if="!fetchState.pending" id="source">
        <Dialog :value="proposal.source_of_proposal">
          Quelle
        </Dialog>
      </div>
    </transition>

    <AppButton class="forward-btn" small icon="arrow_forward" @click="start">
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

    const { fetchState } = useFetch(async () => {
      const id = parseInt(route.value.params.id)
      await loadProposal(id)
    })

    return {
      proposal,
      fetchState,
      start () {
        router.push(`/statement/${proposal.value!.id}/explanation`)
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
