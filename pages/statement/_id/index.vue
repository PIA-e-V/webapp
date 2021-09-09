<template>
  <div>
    <div class="px-4">
      <Stepper />

      <transition name="fade">
        <Statement :proposal="proposal" />
      </transition>
    </div>

    <transition name="fade">
      <div id="source">
        <Dialog :value="proposal.source_of_proposal">
          <div class="grid auto-rows-auto gap-1" style="grid-template-columns: 24px 50px">
            <div><span class="material-icons">info</span></div>
            <span>Quelle</span>
          </div>
        </Dialog>
      </div>
    </transition>

    <AppButton class="forward-btn" small icon="arrow_forward" @click="start"> Weiter gehts </AppButton>
  </div>
</template>

<script lang="ts">
import { PropType, Ref, defineComponent, useRouter } from '@nuxtjs/composition-api'
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
    ctx.emit('titleChanged', 'Statement')

    const router = useRouter()

    return {
      start() {
        router.push(`/statement/${props.proposal.id}/explanation`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.forward-btn {
  bottom: 60px;
  right: 10px;

  @apply absolute;
}

#source {
  left: 10px;
  bottom: 55px;

  @apply absolute;
}
</style>
