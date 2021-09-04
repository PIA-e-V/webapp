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
        <div class="grid auto-rows-auto gap-1" style="grid-template-columns: 24px 50px">
          <div><span class="material-icons">info</span></div>
          <span>Quelle</span>
        </div>
      </Dialog>
    </div>

    <div v-if="!fetchState.pending" id="feedback-btn" @click="feedbackDialog = true">
      <div class="grid auto-rows-auto gap-1 outline-none" style="grid-template-columns: 24px 80px">
        <div><span class="material-icons">feedback</span></div>
        <span class="underline" style="line-height: 18px">Feedback</span>
      </div>
    </div>

    <AppButton class="forward-btn" small icon="arrow_forward" @click="nextStep"> Weiter gehts </AppButton>

    <BottomDialog :value.sync="feedbackDialog">
      <div v-for="(r, index) in reasons" :key="r.type">
        <span class="underline cursor-pointer" @click="confirm(r)">{{ r.description }}</span>
        <hr v-if="index !== reasons.length - 1" class="my-2" />
      </div>
    </BottomDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useFetch, useRoute, useRouter } from '@nuxtjs/composition-api'
import AppButton from '~/components/Button.vue'
import useProposals from '~/store/useProposals'
import useFeedback, { Raeson } from '~/composables/useFeedback'
import useConfirmationDialog from '~/composables/useConfirmationDialog'
import useNotifications from '~/composables/useNotifications'

export default defineComponent({
  components: {
    AppButton
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { currentProposal: proposal, loadProposal } = useProposals()
    const { confirm } = useConfirmationDialog()
    const { success } = useNotifications()
    const { reasons, createFeedback } = useFeedback()

    const id = parseInt(route.value.params.id)
    const { fetchState } = useFetch(async () => {
      await loadProposal(id)
    })
    const feedbackDialog = ref(false)

    return {
      proposal,
      fetchState,
      reasons,
      feedbackDialog,
      nextStep() {
        router.push(`/statement/${id}/arguments`)
      },
      async confirm(reason: Raeson) {
        const sendFeedback = await confirm(
          'Feedback absenden?',
          `Möchtest du das Feedback "${reason.description}" wirklich absenden?`
        )
        if (!sendFeedback) {
          feedbackDialog.value = false
          return
        }

        const created = await createFeedback(reason, id, 'App\\Models\\Proposal', 2)

        if (created) {
          success('Dein Feedback wurde abgeschickt')
        }

        feedbackDialog.value = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  height: 120px;
  background: #3a4090;

  h1 {
    color: white;
    font-size: 20pt;
    font-family: 'Bree Serif';
    @apply pt-4 font-bold text-center;
  }

  #back-btn {
    top: 26px;
  }
}

.short-statement {
  color: white;

  @apply text-center font-light px-3;
}

.explanation {
  height: 45vh;
  color: #5e5e5e;

  @apply mt-8 bg-white px-5 py-4 overflow-scroll rounded-2xl border;
}

.forward-btn {
  bottom: 60px;
  right: 10px;

  @apply absolute;
}

#feedback-btn {
  left: 10px;
  bottom: 80px;
  @apply absolute cursor-pointer;
}

#source {
  left: 10px;
  bottom: 55px;
  @apply absolute;
}
</style>
