<template>
  <div class="h-full">
    <transition name="fade">
      <header v-if="fetchState.timestamp">
        <div class="title-bar">
          <div class="back-btn" @click="$router.back()">
            <span class="material-icons">arrow_back_ios</span>
          </div>
          <h1>{{ title }}</h1>
        </div>

        <Stepper :steps="totalSteps" :step="step" class="mt-2" />
      </header>
    </transition>

    <transition name="fade">
      <div class="content">
        <NuxtChild v-if="fetchState.timestamp" :statement="statement" @stepChanged="stepChanged" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useFetch, useRoute, watch } from '@nuxtjs/composition-api'
import useStatement from '~/store/useStatement'
import useUser from '~/store/useUser'

type Step = 1 | 2 | 3 | 4

export default defineComponent({
  setup() {
    const route = useRoute()
    const { currentStatement: statement, loadStatement } = useStatement()
    const { reloadUser } = useUser()

    const stepTitles = new Map<Step, string>([
      [1, 'News'],
      [2, 'Argumente'],
      [3, 'Abstimmung'],
      [4, 'Community-Positionen']
    ])

    const { fetchState } = useFetch(async () => {
      const id = parseInt(route.value.params.id)
      await loadStatement(id)

      if (statement.value && statement.value.arguments.length === 0) {
        stepTitles.set(2, 'Abstimmung')
        stepTitles.set(3, 'Community-Positionen')
        stepTitles.delete(4)
      }
    })

    const title = ref('')
    const step = ref<Step>(1)
    return {
      title,
      step,
      statement,
      fetchState,
      totalSteps: computed(() => (statement.value!.arguments.length > 0 ? 4 : 3)),
      stepChanged(newStep: Step) {
        step.value = newStep
        title.value = stepTitles.get(newStep)!

        if (step.value === 4 || (statement.value!.arguments.length === 0 && newStep === 3)) {
          reloadUser()
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

header {
  @apply sticky top-0 bg-white z-10 pb-1;

  .title-bar {
    height: 40px;

    .back-btn {
      line-height: 38px;
      width: 50px;
      @apply text-center h-full cursor-pointer z-10 relative select-none outline-none;

      span {
        @apply inline-block align-middle;
      }
    }

    h1 {
      font-size: 22px;
      font-weight: 500;
      font-family: 'Barlow';
      line-height: 40px;
      @apply text-center absolute top-0 w-full select-none outline-none;
    }
  }
}

.content {
  $headerHeight: 57px;
  height: calc(100% - #{$headerHeight});
  @apply sticky overflow-scroll;
}
</style>
