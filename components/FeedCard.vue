<template>
  <section class="card" @click="openItem">
    <img :src="`/feed/${item.feedable.__typename.toLowerCase()}.jpg`" alt="Teaser" />

    <h2 class="heading" v-html="title" />

    <span class="date" v-html="date" />

    <img :src="icon" class="icon" alt="Type" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, useRouter } from '@nuxtjs/composition-api'
import { FeedItem, Proposal } from '~/@types/graphql-types'
import moment from 'moment'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<FeedItem>,
      required: true
    }
  },
  setup(props) {
    const feedable = computed(() => props.item.feedable)
    const date = ref('Noch nicht abgestimmt')
    const router = useRouter()

    date.value = moment(props.item.active_from).locale('de').format('dd, Do MMMM YYYY')

    return {
      feedable,
      date,
      title: computed(() => feedable.value.short_statement),
      icon: computed(() => `/icons/navigation/${feedable.value.__typename === 'Proposal' ? 'bills.svg' : 'news.svg'}`),
      openItem() {
        if (props.item.feedable.__typename === 'Proposal') {
          router.push(`/statement/${props.item.feedable.id}`)
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.card {
  max-width: 600px;
  //background: $primary;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  @apply mx-auto pb-2 relative overflow-hidden cursor-pointer outline-none select-none;

  img {
    width: 100%;
  }

  .heading {
    font-size: 20px;
    font-weight: 600;
    @apply mt-2 mb-5 px-2;
  }

  .date {
    font-size: 14px;
    font-weight: 400;
    @apply pl-2;
  }

  .icon {
    right: 10px;
    bottom: 10px;
    width: 30px;
    @apply absolute;
  }
}
</style>
