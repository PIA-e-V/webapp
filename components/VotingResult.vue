<template>
  <div class="progress-container">
    <h2 v-if="header">{{ header }}</h2>
    <div class="progress-bar-container">
      <section
        v-for="(res, i) in results"
        :key="i"
        :style="{ background: res.color, width: `${((res.value / total) * 100).toFixed(0)}%` }"
        class="progress"
      />
    </div>
    <div v-if="showLegend" class="legend">
      <div v-for="(res, i) in results" :key="i" :style="{ border: `1px solid ${res.color}` }">
        <span class="whitespace-no-wrap">{{ res.label }} {{ res.value }}</span>
      </div>
    </div>
    <h4 v-if="subtitle">{{ subtitle }}</h4>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { sum } from 'lodash'

export interface VotingResult {
  label: string
  color: string
  value: number
}

export default defineComponent({
  props: {
    showLegend: {
      type: Boolean,
      default: () => true
    },
    header: {
      type: String,
      default: () => null
    },
    subtitle: {
      type: String,
      default: () => ''
    },
    results: {
      type: Array as PropType<Array<VotingResult>>,
      default: () => []
    }
  },
  setup(props) {
    return {
      total: computed(() => sum(props.results?.map((r) => r.value)))
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.progress-container {
  @apply mx-auto;

  .progress-bar-container {
    height: 15px;
    background: #c4c4c4;
    @apply mx-auto rounded-full flex flex-row overflow-hidden;

    .progress {
      height: 15px;
      width: 0;
      background: $primary;
      transition: width 1s;
      transition-timing-function: ease-out;
    }
  }

  .legend {
    font-size: 8pt;
    @apply flex flex-row flex-wrap mt-2;

    div {
      @apply px-2 rounded-md;

      &:not(:last-child) {
        @apply mr-2;
      }
    }
  }
}
</style>
