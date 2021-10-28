<template>
  <section class="card" @click="openItem">
    <img class="header-img" :src="item.feedable.image" alt="Teaser" />

    <div class="flex flex-col justify-between flex-grow">
      <h2 class="heading" v-html="title" />

      <div class="bottom">
        <div class="info">
          <p>
            <span class="material-icons topic-icon mr-1" v-text="item.feedable.topic.icon"></span>
            {{ item.feedable.topic.title }}
          </p>
          <span class="date" v-html="date" />
        </div>

        <div class="icon">
          <img :src="icon" alt="Type" />
          <!--          <span v-if="item.feedable.__typename === 'Proposal'">Antrag</span>-->
          <!--          <span v-else>{{ item.feedable.news ? 'News' : 'Petition' }}</span>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, useRouter } from '@nuxtjs/composition-api'
import { FeedItem, Proposal, Statement } from '~/@types/graphql-types'
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
      icon: computed(() => {
        const basePath = '/icons/navigation'

        if (feedable.value.__typename === 'Proposal') {
          return `${basePath}/bills.svg`
        } else {
          const statement = feedable.value as Statement
          if (statement.news) {
            return `${basePath}/news.svg`
          } else {
            return `${basePath}/petitions.svg`
          }
        }
      }),
      openItem() {
        if (props.item.feedable.__typename === 'Proposal') {
          router.push(`/proposal/${props.item.feedable.id}`)
        } else {
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
  @apply mx-auto relative flex flex-col overflow-hidden cursor-pointer outline-none select-none;

  img {
    width: 100%;

    &.header-img {
      aspect-ratio: 500 / 200;
    }
  }

  h2.heading {
    font-weight: 500;
    @apply mt-2 mb-5 px-2;
  }

  .bottom {
    @apply flex flex-row justify-between;

    .info {
      font-size: 14px;
      height: 50px;
      @apply inline-block pl-2;

      .topic-icon {
        vertical-align: bottom;
        font-size: 16pt;
      }

      .date {
        font-weight: 400;
      }
    }

    .icon {
      @apply inline-block pr-2 pt-5;

      img {
        width: 20px;
        @apply mx-auto;
      }
    }
  }
}
</style>
