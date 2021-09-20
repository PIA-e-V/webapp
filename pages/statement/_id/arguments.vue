<template>
  <div class="argument-container">
    <div class="h-full overflow-scroll flex flex-col">
      <p class="short-statement px-4">{{ proposal.short_statement }}</p>

      <transition-group
        tag="div"
        class="argument-slider"
        name="slide"
        @enter="transitionActive = true"
        @leave="transitionActive = false"
      >
        <div v-for="a in [currentArgument]" :key="a.id" class="argument-card">
          <header>Argument {{ index.current }}/{{ index.total }}</header>

          <section class="content">{{ currentArgument.statement }}</section>
        </div>
      </transition-group>
    </div>

    <div class="action-buttons">
      <div @click="save('DISAGREE')">
        <div class="btn">
          <span class="material-icons red">close</span>
        </div>
        Lehne ab
      </div>
      <div @click="save('NEUTRAL')">
        <div class="btn">
          <span class="material-icons gray">help_outline</span>
        </div>
        Neutral
      </div>
      <div @click="save('AGREE')">
        <div class="btn">
          <span class="material-icons green">done</span>
        </div>
        Stimme zu
      </div>
    </div>

    <!--    <div id="feedback-btn" @click="feedbackDialog = true">-->
    <!--      <div class="grid auto-rows-auto gap-1 outline-none" style="grid-template-columns: 24px 80px">-->
    <!--        <div><span class="material-icons">feedback</span></div>-->
    <!--        <span class="underline" style="line-height: 18px">Feedback</span>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div id="source">-->
    <!--      <Dialog :value="currentArgument.source">-->
    <!--        <div class="grid auto-rows-auto gap-1" style="grid-template-columns: 24px 50px">-->
    <!--          <div><span class="material-icons">info</span></div>-->
    <!--          <span>Quelle</span>-->
    <!--        </div>-->
    <!--      </Dialog>-->
    <!--    </div>-->

    <BottomDialog :value.sync="feedbackDialog">
      <div v-for="(r, index) in reasons" :key="r.type">
        <span class="underline cursor-pointer" @click="confirm(r)">{{ r.description }}</span>
        <hr v-if="index !== reasons.length - 1" class="my-2" />
      </div>
    </BottomDialog>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions'
import { mutation } from 'gql-query-builder'
import { shuffle } from 'lodash'
import Stepper from '~/components/Stepper.vue'
import AppButton from '~/components/Button.vue'
import DecisionCard, { Index } from '~/components/DecisionCard.vue'
import BottomDialog from '~/components/BottomDialog.vue'
import useGraphql from '~/composables/useGraphql'
import useConfirmationDialog from '~/composables/useConfirmationDialog'
import { Argument, Proposal } from '~/@types/graphql-types'
import useNotifications from '~/composables/useNotifications'
import useFeedback, { Raeson } from '~/composables/useFeedback'

export default defineComponent({
  components: {
    Stepper,
    AppButton,
    DecisionCard,
    BottomDialog
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
    const { confirm } = useConfirmationDialog()
    const { success, error } = useNotifications()
    const { reasons, createFeedback } = useFeedback()

    const args = ref<Argument[]>([])
    const currentArgumentIndex = ref(0)
    const feedbackDialog = ref(false)
    const currentArgument = computed(() => args.value[currentArgumentIndex.value])
    const index = computed<Index>(() => ({
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
        router.push(`/statement/${props.proposal.id}/proposal`)
        return
      }

      currentArgumentIndex.value += 1
    }

    const transitionActive = ref(false)
    return {
      index,
      transitionActive,
      currentArgument,
      currentArgumentIndex,
      feedbackDialog,
      reasons,
      save,
      goBack() {
        if (currentArgumentIndex.value === 0) {
          router.go(-1)
        } else {
          currentArgumentIndex.value -= 1
        }
      },
      async confirm(reason: Raeson) {
        const sendFeedback = await confirm(
          'Feedback absenden?',
          `Möchtest du das Feedback "${reason.description}" wirklich absenden?`
        )
        if (!sendFeedback || !currentArgument.value) {
          feedbackDialog.value = false
          return
        }

        const created = await createFeedback(reason, currentArgument.value.id, 'App\\Models\\Argument', 3)

        if (created) {
          success('Dein Feedback wurde abgeschickt')
        }

        feedbackDialog.value = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.argument-container {
  height: calc(100% - 104px);

  .short-statement {
    font-size: 20px;
    font-weight: 500;
    @apply pt-2;
  }

  .argument-slider {
    @apply relative overflow-x-hidden overflow-y-scroll flex-grow;

    .argument-card {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      width: calc(100% - 2rem);
      left: 1rem;
      top: 1rem;
      @apply rounded-xl p-2 mx-auto absolute;

      header {
        font-size: 18px;
        @apply mb-4;
      }
    }
  }

  .action-buttons {
    padding: 10px 0;
    @apply grid grid-cols-3 text-center sticky bg-white w-full bottom-0;

    .btn {
      border: 2px solid #dcdcdc;
      width: 60px;
      height: 60px;
      @apply rounded-full mx-auto;

      .material-icons {
        line-height: 56px;
        font-size: 40px;

        &.red {
          color: #f93a3a;
        }

        &.gray {
          color: #4d4d4d;
        }

        &.green {
          color: #00ec89;
        }
      }
    }
  }
}

.forward-btn {
  bottom: 60px;
  right: 10px;
  background: rgba(65, 60, 177, 0.66);
  @apply absolute;
}

#feedback-btn {
  left: 10px;
  bottom: 80px;
  @apply absolute cursor-pointer;
}

#source {
  left: 10px;
  bottom: 55px;
  @apply absolute;
}
</style>
