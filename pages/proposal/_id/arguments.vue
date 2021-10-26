<template>
  <div class="argument-container">
    <div class="h-full overflow-scroll flex flex-col">
      <p class="short-statement px-4">{{ proposal.short_statement }}</p>

      <transition-group
        tag="div"
        class="argument-slider"
        name="slide"
        @enter="transitions.slide = true"
        @leave="transitions.slide = false"
      >
        <ArgumentCard
          v-for="a in [currentArgument]"
          :key="a.id"
          :argument="currentArgument"
          :current="index.current"
          :total="index.total"
        />
      </transition-group>
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn">
          <img src="/icons/arguments/oppose.svg" alt="Ablehnen" />
        </div>
        Ablehnen
      </div>
      <div @click="save('NEUTRAL')">
        <div class="btn">
          <img src="/icons/arguments/not_sure.svg" alt="Nicht sicher" />
        </div>
        Nicht sicher
      </div>
      <div @click="save('AGREE')">
        <div class="btn">
          <img src="/icons/arguments/agree.svg" alt="Nicht sicher" />
        </div>
        Zustimmen
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, useRouter, reactive } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import { shuffle } from 'lodash'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import useGraphql from '~/composables/useGraphql'
import { Argument, Proposal } from '~/@types/graphql-types'
import useNotifications from '~/composables/useNotifications'

export default defineComponent({
  components: {
    Stepper,
    AppButton
  },
  props: {
    proposal: {
      type: Object as PropType<Proposal>,
      required: true
    }
  },
  setup(props, ctx) {
    ctx.emit('stepChanged', 2)

    const router = useRouter()
    const client = useGraphql()
    const { error } = useNotifications()

    const args = ref<Argument[]>([])
    const currentArgumentIndex = ref(0)
    const showSources = ref(false)
    const feedbackDialog = ref(false)
    const currentArgument = computed(() => args.value[currentArgumentIndex.value])
    const index = computed<{ total: number; current: number }>(() => ({
      total: props.proposal.arguments.length,
      current: currentArgumentIndex.value + 1
    }))

    args.value = shuffle(props.proposal.arguments as Argument[])

    async function save(result: string) {
      const operation: IQueryBuilderOptions = {
        operation: 'upsertOpinion',
        variables: {
          input: {
            type: 'UpsertOpinionInput',
            required: true,
            value: {
              opinionable_id: currentArgument.value!.id,
              opinionable_type: 'App\\Models\\Argument',
              position: result
            }
          }
        },
        fields: ['id']
      }

      const q = mutation(operation)
      const { upsertOpinion } = await client.mutation(q.query, q.variables)

      if (!upsertOpinion) {
        error('Es ist ein Fehler aufgetreten')
        return
      }

      nextArgument()
    }

    function nextArgument() {
      if (currentArgumentIndex.value + 1 === props.proposal.arguments.length) {
        router.push(`/proposal/${props.proposal.id}/proposal`)
        return
      }

      currentArgumentIndex.value += 1
    }

    const transitions = reactive({
      slide: false,
      fade: false
    })
    return {
      index,
      transitions,
      currentArgument,
      currentArgumentIndex,
      feedbackDialog,
      showSources,
      save,
      goBack() {
        if (currentArgumentIndex.value === 0) {
          router.go(-1)
        } else {
          currentArgumentIndex.value -= 1
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';

.argument-container {
  height: calc(100% - 104px);

  .short-statement {
    font-size: 20px;
    font-weight: 500;
    @apply pt-2 outline-none select-none;
  }

  .argument-slider {
    @apply relative overflow-x-hidden overflow-y-scroll flex-grow;
  }

  .action-buttons {
    padding: 10px 0;
    @apply grid grid-cols-3 text-center sticky bg-white w-full bottom-0 select-none outline-none;

    .btn {
      border: 2px solid #dcdcdc;
      width: 60px;
      height: 60px;
      @apply rounded-full mx-auto cursor-pointer select-none outline-none;

      img {
        transform: scale(0.55);
        @apply w-full h-full;
      }
    }
  }
}
</style>
