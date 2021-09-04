<template>
  <section class="statement">
    <h2 class="heading" v-html="proposal.statement" />

    <span class="date" v-html="formattedDate" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import moment from 'moment'

export default defineComponent({
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    return {
      formattedDate: computed(() => props.proposal.latest_voting
        ? moment(props.proposal.latest_voting.carried_out_at).locale('de').format('dd, Do MMMM YYYY')
        : 'Noch nicht abgestimmt')
    }
  }
})
</script>

<style lang="scss" scoped>
.statement {
  max-width: 600px;
  @apply bg-white mx-auto mt-5 p-2 pb-5 rounded-2xl shadow-lg text-center;

  .heading {
    font-size: 16pt;
    @apply font-bold mt-2 mb-5;
  }
}

.statement .date {
  font-size: 0.9em;
  color: #5e5e5e;
  @apply font-light;
}
</style>
