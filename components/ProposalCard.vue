<template>
  <div class="proposal-card cursor-pointer" :style="`height: ${hideTopic ? 97 : 125}px`" @click="$router.push(`/statement/${value.id}`)">
    <div v-if="!hideTopic" class="topic">
      <div class="title">
        {{ value.topic.title }}
      </div>
      <div class="icon">
        <span class="material-icons">{{ value.topic.icon }}</span>
      </div>
    </div>
    <div class="statement">
      {{ value.short_statement }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    // Proposal
    value: {
      type: Object,
      required: true
    },
    hideTopic: {
      type: Boolean,
      default: () => false
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
.proposal-card {
  display: inline-grid;
  width: 200px;
  height: 125px;

  @apply shadow rounded m-5 p-4
}

.proposal-card:not(:first-child) {
  margin-left: 0;
}

.topic .title {
  font-size: 11pt;
  width: 138px;
  text-overflow: ellipsis;

  @apply font-bold overflow-hidden whitespace-no-wrap inline-block
}

.topic .icon {
  font-size: 16pt;

  @apply float-right
}

.proposal-card .statement {
  height: 75px;
  font-size: 9pt;

  @apply overflow-hidden break-words whitespace-normal w-full
}

</style>
