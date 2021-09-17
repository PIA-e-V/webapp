<template>
  <section class="card">
    <h2 class="heading" v-html="proposal.statement" />

    <span class="date" v-html="formattedDate" />

    <span class="material-icons bg-icon">{{ proposal.topic.icon }}</span>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import { Proposal } from '~/@types/graphql-types'
import moment from 'moment'

export default defineComponent({
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true
    }
  },
  setup(props) {
    return {
      formattedDate: computed(() =>
        props.proposal.latest_voting
          ? moment(props.proposal.latest_voting.carried_out_at).locale('de').format('dd, Do MMMM YYYY')
          : 'Noch nicht abgestimmt'
      )
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.card {
  max-width: 600px;
  background: $primary;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @apply mx-auto text-white mt-5 px-4 pt-1 pb-5 relative overflow-hidden;

  .heading {
    font-size: 20px;
    font-weight: 600;
    @apply mt-2 mb-5;
  }

  .date {
    font-size: 14px;
    font-weight: 400;
  }

  span.bg-icon.material-icons {
    bottom: -20px;
    right: -100px;
    color: #ffffff1a;
    font-size: 20rem;
    line-height: 0.5;
    @apply absolute;
  }
}
</style>
