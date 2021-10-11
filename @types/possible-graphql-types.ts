import { IntrospectionResultData } from 'apollo-cache-inmemory'

export default {
  __schema: {
    types: [
      {
        name: 'Query',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Int',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'Argument',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'String',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'ArgumentPosition',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'Date',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'DateTime',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'Opinion',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'OpinionResult',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'User',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Proposal',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'ProposalType',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'Boolean',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'Voting',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'VotingOutcome',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'Chamber',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Parliament',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Legislature',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Party',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Country',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Topic',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Statement',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Role',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Opinionable',
        kind: 'UNION',
        possibleTypes: [
          {
            name: 'Proposal'
          },
          {
            name: 'Argument'
          }
        ]
      },
      {
        name: 'QueryFeedScheduleWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryFeedScheduleWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'SQLOperator',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'Mixed',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'QueryFeedScheduleWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'FeedItem',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Feedable',
        kind: 'UNION',
        possibleTypes: [
          {
            name: 'Proposal'
          },
          {
            name: 'Statement'
          }
        ]
      },
      {
        name: 'QueryFeedWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryFeedWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryFeedWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'FeedType',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'StatementScore',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'WeekUserCount',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryTopicsWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryTopicsWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryTopicsWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryTopicsOrderByOrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryTopicsOrderByColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'SortOrder',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'ScoreResult',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Float',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'TopicResult',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryArgumentsWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryArgumentsWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryArgumentsWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryArgumentsOrderByOrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryArgumentsOrderByColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'ArgumentPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'PaginatorInfo',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'CountryPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryFeedbackWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryFeedbackWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryFeedbackWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryFeedbackOrderByOrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryFeedbackOrderByColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'FeedbackPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Feedback',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Feedbackable',
        kind: 'UNION',
        possibleTypes: [
          {
            name: 'Argument'
          },
          {
            name: 'Proposal'
          }
        ]
      },
      {
        name: 'LegislaturePaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'OpinionPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'ParliamentPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryProposalsWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryProposalsWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryProposalsWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryProposalsOrderByOrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryProposalsOrderByColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'ProposalPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryStatementsWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryStatementsWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryStatementsWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryStatementsOrderByOrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryStatementsOrderByColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'StatementPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'UserPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryVotingsWhereWhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryVotingsWhereColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'QueryVotingsWhereWhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryVotingsOrderByOrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'QueryVotingsOrderByColumn',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'VotingPaginator',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Mutation',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertArgumentInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'CreatePartyBelongsToMany',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'CreateProposalBelongsToMany',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertFeedItemInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'CreateFeedbackInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertOpinionInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertProposalInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'CreateArgumentBelongsToMany',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'Upload',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: 'UpsertStatementInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertTopicInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'LoginResponse',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'RegistrationResponse',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'UserVerificationResponse',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertVotingInput',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'UpsertChildVotingsHasMany',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'ID',
        kind: 'SCALAR',
        possibleTypes: []
      },
      {
        name: '__Schema',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: '__Type',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: '__TypeKind',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: '__Field',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: '__InputValue',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: '__EnumValue',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: '__Directive',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: '__DirectiveLocation',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'OrderByClause',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'SimplePaginatorInfo',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'PageInfo',
        kind: 'OBJECT',
        possibleTypes: []
      },
      {
        name: 'Trashed',
        kind: 'ENUM',
        possibleTypes: []
      },
      {
        name: 'WhereConditions',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      },
      {
        name: 'WhereConditionsRelation',
        kind: 'INPUT_OBJECT',
        possibleTypes: []
      }
    ]
  }
} as IntrospectionResultData
