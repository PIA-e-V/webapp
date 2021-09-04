import { mutation } from 'gql-query-builder'
import useGraphql from '~/composables/useGraphql'

export type RaesonType = 'CONFUSING' | 'MISTAKE' | 'DISAGREE' | 'OTHER'
export type Raeson = { type: RaesonType; description: string }
export type FeedbackableType = 'App\\Models\\Proposal' | 'App\\Models\\Argument'

export default function () {
  const client = useGraphql()

  return {
    reasons: [
      { type: 'CONFUSING', description: 'Der Text ist verwirrend' },
      { type: 'MISTAKE', description: 'Im Text ist ein Fehler' },
      { type: 'DISAGREE', description: 'Ich stimme der Formulierung nicht zu' },
      { type: 'OTHER', description: 'Etwas anderes' }
    ] as Array<Raeson>,
    async createFeedback(
      reason: Raeson,
      feedbackableId: number,
      feedbackableType: FeedbackableType,
      step: number
    ): Promise<boolean> {
      const q = mutation({
        operation: 'createFeedback',
        variables: {
          input: {
            type: 'CreateFeedbackInput',
            required: true,
            value: {
              feedbackable_id: feedbackableId,
              feedbackable_type: feedbackableType,
              step,
              feedback: reason.type
            }
          }
        },
        fields: ['id']
      })

      const { createFeedback } = await client.mutation(q.query, q.variables)

      return !!createFeedback
    }
  }
}
