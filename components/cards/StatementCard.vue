<template>
  <section class="card" :class="{ 'sources-active': showSources }">
    <transition name="fade" @after-leave="transitionActive = false">
      <div v-if="!transitionActive && !showSources">
        <div class="flex justify-center pt-2">
          <div class="box mr-1">
            <span class="material-icons mt-2" style="color: #f76b30">{{ item.topic.icon }}</span>
          </div>

          <div class="box">
            <span class="text-black" style="line-height: 2.4">{{ item.topic.title }}</span>
          </div>
        </div>

        <h2 class="heading" v-html="item.statement" />

        <!--        <div class="flex flex-row justify-between">-->
        <!--          <span class="date" v-text="date" />-->

        <!--          <div-->
        <!--            class="sources-btn"-->
        <!--            @click="-->
        <!--              transitionActive = true-->
        <!--              showSources = true-->
        <!--            "-->
        <!--          >-->
        <!--            <span>Bronnen</span> <span class="material-icons">info</span>-->
        <!--          </div>-->
        <!--        </div>-->
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
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid lightgray;
  @apply mx-auto text-black px-4 pt-1 pb-4 relative outline-none select-none w-full h-full;

  &:not(.sources-active) {
    @apply overflow-hidden;
  }

  &.sources-active {
    @apply bg-white text-black break-words;
  }

  .heading {
    font-size: 20px;
    font-weight: 600;
    @apply mt-4 text-center;
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
        @apply rounded-full text-black;
      }
    }
  }
}

.box {
  border: 1px solid lightgray;
  @apply rounded-xl px-2;
}
</style>
