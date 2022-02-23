<template>
  <section class="card" :class="{ 'sources-active': showSources }">
    <transition name="fade" @after-leave="transitionActive = false">
      <div v-if="!transitionActive && !showSources">
        <h2 class="heading" v-html="item.statement" />

        <div class="flex flex-row justify-between">
          <span class="date" v-text="date" />

          <div
            class="sources-btn"
            @click="
              transitionActive = true
              showSources = true
            "
          >
            <span>Bronnen</span> <span class="material-icons">info</span>
          </div>
        </div>

        <span class="material-icons bg-icon">{{ item.topic.icon }}</span>
      </div>
    </transition>
    <transition name="fade" @after-leave="transitionActive = false">
      <div v-if="!transitionActive && showSources">
        <p v-html="item.source_of_explanation" />

        <div
          class="sources-btn flex flex-row-reverse flex-grow-0"
          @click="
            transitionActive = true
            showSources = false
          "
        >
          <span class="material-icons back-icon"> keyboard_arrow_left </span>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from '@nuxtjs/composition-api'
import { Feedable, Proposal, Statement } from '~/@types/graphql-types'
import moment from 'moment'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Feedable>,
      required: true
    }
  },
  setup(props) {
    const showSources = ref(false)
    const transitionActive = ref(false)

    return {
      showSources,
      transitionActive,
      date: computed(() => {
        if (props.item.__typename === 'Proposal') {
          return props.item.latest_voting
            ? moment(props.item.latest_voting.carried_out_at).locale('nl').format('dd, Do MMMM YYYY')
            : 'Noch nicht abgestimmt'
        }

        return ''
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.card {
  max-width: min(100%, 600px);
  background: $primary;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @apply mx-auto text-white px-4 pt-1 pb-4 relative outline-none select-none;

  &:not(.sources-active) {
    @apply overflow-hidden;
  }

  &.sources-active {
    @apply bg-white text-black break-words;
  }

  .heading {
    font-size: 20px;
    font-weight: 600;
    @apply mt-2 mb-5;
  }

  .date {
    //font-size: 14px;
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

  .sources-btn {
    @apply cursor-pointer select-none outline-none z-10;

    .material-icons {
      vertical-align: bottom;
      font-size: 22px !important;

      &.back-icon {
        background: $primary;
        @apply rounded-full text-white;
      }
    }
  }
}
</style>
