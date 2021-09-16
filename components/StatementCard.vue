<template>
  <section class="card">
    <h2 class="heading" v-html="proposal.statement" />

    <span class="date" v-html="formattedDate" />

    <div class="bg-icon">
      <span class="material-icons">{{ proposal.topic.icon }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api'
import moment from 'moment'
import { Proposal } from '~/@types/graphql-types'

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

  .bg-icon {
    top: calc(50% - 10rem);
    right: -150px;
    @apply absolute;

    span {
      color: #ffffff1a;
      font-size: 20rem;
    }
  }
}
</style>
