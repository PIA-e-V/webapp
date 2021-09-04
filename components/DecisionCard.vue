<template>
  <div>
    <section class="card">
      <span class="description" v-html="value" />

      <section v-if="index" class="index">
        {{ index.current }}/{{ index.total }}
      </section>
      <section v-else style="height: 30px;" />
    </section>

    <div v-if="decisions.length > 0" class="btn-container" :style="`grid-template-columns: repeat(${decisions.length},minmax(0,1fr))`">
      <button v-for="d in decisions" :key="d.result" class="decision-btn" @click="$emit('decision', d.result)">
        <span class="material-icons">{{ d.icon }}</span>
      </button>

      <div v-for="d in decisions" :key="`b-${d.result}`" style="font-size: 10pt">
        {{ d.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export type Decision = {
  label: string
  result: string
  icon: string
}
export interface Index {
  total: number
  current: number
}
export default defineComponent({
  props: {
    value: {
      type: String,
      default: () => ''
    },
    decisions: {
      type: Array as PropType<Array<Decision>>,
      default: () => []
    },
    index: {
      type: Object as PropType<Index>,
      required: false,
      default: () => undefined
    }
  },
  emits: ['decision'],
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.card {
  max-width: 600px;
  @apply bg-white mx-auto mt-5 p-2 pb-3 rounded-2xl shadow-lg text-center font-light;

  .description {
    font-size: 10pt;
    max-height: 150px;

    @apply font-bold block mt-2 overflow-scroll px-1;
  }
}

.card .index {
  background: #3A4090;
  height: 30px;
  width: 30px;
  line-height: 30px;
  font-size: 10pt;
  color: white;

  @apply rounded-3xl font-bold ml-auto mr-1 mt-4
}

.decision-btn {
  background: #3A4090;
  color: white;
  width: 50px;
  height: 50px;
  outline: none;

  @apply rounded-full m-auto text-center cursor-pointer
}

.decision-btn .material-icons {
  font-size: 24pt;
  line-height: 50px;
}

.btn-container {
  max-width: 600px;

  @apply grid grid-rows-2 gap-1 mx-auto px-8 -mt-6 text-center
}
</style>
