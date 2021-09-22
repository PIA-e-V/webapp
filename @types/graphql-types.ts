export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: any;
};

export type Argument = {
  __typename?: 'Argument';
  id: Scalars['Int'];
  statement: Scalars['String'];
  position: ArgumentPosition;
  source: Scalars['String'];
  stated_at?: Maybe<Scalars['Date']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  short_statement: Scalars['String'];
  opinions: Array<Opinion>;
  proposals: Array<Proposal>;
  parties: Array<Party>;
};

/** A paginated list of Argument items. */
export type ArgumentPaginator = {
  __typename?: 'ArgumentPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Argument items. */
  data: Array<Argument>;
};

export enum ArgumentPosition {
  Against = 'AGAINST',
  InFavor = 'IN_FAVOR',
  Neutral = 'NEUTRAL'
}

export type Chamber = {
  __typename?: 'Chamber';
  id: Scalars['Int'];
  parliament_id: Scalars['Int'];
  name: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  parliament: Parliament;
  legislatures: Array<Legislature>;
  votings: Array<Voting>;
  activeLegislature?: Maybe<Legislature>;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['Int'];
  code: Scalars['String'];
  name: Scalars['String'];
  parliaments: Array<Parliament>;
  parties: Array<Party>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

/** A paginated list of Country items. */
export type CountryPaginator = {
  __typename?: 'CountryPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Country items. */
  data: Array<Country>;
};

export type CreateArgumentBelongsToMany = {
  sync?: Maybe<Array<Scalars['Int']>>;
};

export type CreateFeedbackInput = {
  feedbackable_id: Scalars['Int'];
  feedbackable_type: Scalars['String'];
  step: Scalars['Int'];
  feedback: Scalars['String'];
};

export type CreatePartyBelongsToMany = {
  sync?: Maybe<Array<Scalars['Int']>>;
};

export type CreateProposalBelongsToMany = {
  sync?: Maybe<Array<Scalars['Int']>>;
};



export type FeedItem = {
  __typename?: 'FeedItem';
  id: Scalars['Int'];
  feedable_id: Scalars['Int'];
  feedable_type: Scalars['String'];
  active_from: Scalars['DateTime'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  feedable: Feedable;
};

export type Feedable = Proposal | Statement;

export type Feedback = {
  __typename?: 'Feedback';
  id: Scalars['Int'];
  feedbackable_id: Scalars['Int'];
  feedbackable_type: Scalars['String'];
  step: Scalars['Int'];
  feedback: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  feedbackable: Feedbackable;
};

/** A paginated list of Feedback items. */
export type FeedbackPaginator = {
  __typename?: 'FeedbackPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Feedback items. */
  data: Array<Feedback>;
};

export type Feedbackable = Argument | Proposal;

export type Legislature = {
  __typename?: 'Legislature';
  id: Scalars['Int'];
  seats: Scalars['Int'];
  started_at: Scalars['Date'];
  ended_at: Scalars['Date'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  chamber: Chamber;
  parties: Array<Party>;
  votings: Array<Voting>;
};

/** A paginated list of Legislature items. */
export type LegislaturePaginator = {
  __typename?: 'LegislaturePaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Legislature items. */
  data: Array<Legislature>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: User;
  token: Scalars['String'];
};


export type Mutation = {
  __typename?: 'Mutation';
  upsertArgument?: Maybe<Argument>;
  deleteArgument: Argument;
  createFeedback?: Maybe<Feedback>;
  upsertOpinion?: Maybe<Opinion>;
  upsertProposalScheduleEntry?: Maybe<ProposalScheduleEntry>;
  deleteProposalScheduleEntryByDate?: Maybe<ProposalScheduleEntry>;
  upsertProposal?: Maybe<Proposal>;
  deleteProposal: Proposal;
  upsertStatement?: Maybe<Statement>;
  deleteStatement: Statement;
  upsertTopic?: Maybe<Topic>;
  /** Log in to a new session and get the user. */
  login: LoginResponse;
  /** Log out from the current session, showing the user one last time. */
  logout?: Maybe<User>;
  /** Registers an anonymous user to use the app. */
  registerAnonymousUser: LoginResponse;
  /** Registers an user. */
  register: RegistrationResponse;
  /** Verifies an user. */
  verifyUser: UserVerificationResponse;
  upsertVoting?: Maybe<Voting>;
  deleteVoting: Voting;
};


export type MutationUpsertArgumentArgs = {
  id?: Maybe<Scalars['Int']>;
  input: UpsertArgumentInput;
};


export type MutationDeleteArgumentArgs = {
  id: Scalars['Int'];
};


export type MutationCreateFeedbackArgs = {
  id?: Maybe<Scalars['Int']>;
  input: CreateFeedbackInput;
};


export type MutationUpsertOpinionArgs = {
  input: UpsertOpinionInput;
};


export type MutationUpsertProposalScheduleEntryArgs = {
  id?: Maybe<Scalars['Int']>;
  input: UpsertProposalScheduleEntryInput;
};


export type MutationDeleteProposalScheduleEntryByDateArgs = {
  show_at: Scalars['Date'];
};


export type MutationUpsertProposalArgs = {
  id?: Maybe<Scalars['Int']>;
  input: UpsertProposalInput;
};


export type MutationDeleteProposalArgs = {
  id: Scalars['Int'];
};


export type MutationUpsertStatementArgs = {
  id?: Maybe<Scalars['Int']>;
  input: UpsertStatementInput;
};


export type MutationDeleteStatementArgs = {
  id: Scalars['Int'];
};


export type MutationUpsertTopicArgs = {
  id?: Maybe<Scalars['Int']>;
  input: UpsertTopicInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String'];
};


export type MutationUpsertVotingArgs = {
  input: UpsertVotingInput;
};


export type MutationDeleteVotingArgs = {
  id: Scalars['Int'];
};

export type Opinion = {
  __typename?: 'Opinion';
  id: Scalars['Int'];
  position: OpinionResult;
  opinionable_id: Scalars['Int'];
  opinionable_type: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  user: User;
  opinionable: Opinionable;
};

/** A paginated list of Opinion items. */
export type OpinionPaginator = {
  __typename?: 'OpinionPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Opinion items. */
  data: Array<Opinion>;
};

export enum OpinionResult {
  Agree = 'AGREE',
  Disagree = 'DISAGREE',
  Neutral = 'NEUTRAL'
}

export type Opinionable = Proposal | Argument;

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Parliament = {
  __typename?: 'Parliament';
  id: Scalars['Int'];
  name: Scalars['String'];
  legislatures: Array<Legislature>;
  countries: Array<Country>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

/** A paginated list of Parliament items. */
export type ParliamentPaginator = {
  __typename?: 'ParliamentPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Parliament items. */
  data: Array<Parliament>;
};

export type Party = {
  __typename?: 'Party';
  id: Scalars['Int'];
  country_id: Scalars['Int'];
  name: Scalars['String'];
  color: Scalars['String'];
  proposals: Array<Proposal>;
  legislatures: Array<Legislature>;
  arguments: Array<Argument>;
  country: Country;
  votings: Array<Voting>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type Proposal = {
  __typename?: 'Proposal';
  id: Scalars['Int'];
  topic_id: Scalars['Int'];
  title: Scalars['String'];
  type: ProposalType;
  statement: Scalars['String'];
  short_statement: Scalars['String'];
  explanation: Scalars['String'];
  inverted: Scalars['Boolean'];
  active: Scalars['Boolean'];
  source_of_explanation: Scalars['String'];
  source_of_proposal: Scalars['String'];
  color: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  short_title: Scalars['String'];
  latest_voting?: Maybe<Voting>;
  has_voting: Scalars['Boolean'];
  parties: Array<Party>;
  votings: Array<Voting>;
  arguments: Array<Argument>;
  topic: Topic;
  opinions: Array<Opinion>;
};

/** A paginated list of Proposal items. */
export type ProposalPaginator = {
  __typename?: 'ProposalPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Proposal items. */
  data: Array<Proposal>;
};

export type ProposalScheduleEntry = {
  __typename?: 'ProposalScheduleEntry';
  id: Scalars['Int'];
  proposal_id: Scalars['Int'];
  show_at: Scalars['Date'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  proposal: Proposal;
};

export enum ProposalType {
  ResolutionRecommendation = 'RESOLUTION_RECOMMENDATION',
  Bill = 'BILL',
  ChangeRequest = 'CHANGE_REQUEST',
  Regulation = 'REGULATION'
}

export type Query = {
  __typename?: 'Query';
  argument?: Maybe<Argument>;
  chambers: Array<Chamber>;
  chamber?: Maybe<Chamber>;
  country?: Maybe<Country>;
  feed: Array<FeedItem>;
  legislature?: Maybe<Legislature>;
  activeLegislature?: Maybe<Legislature>;
  opinion?: Maybe<Opinion>;
  parliament?: Maybe<Parliament>;
  parties: Array<Party>;
  party?: Maybe<Party>;
  proposalScheduleEntries: Array<ProposalScheduleEntry>;
  proposal?: Maybe<Proposal>;
  proposalOfTheDay: Proposal;
  statement?: Maybe<Statement>;
  usersPerWeek: Array<WeekUserCount>;
  totalUsers: Scalars['Int'];
  topics: Array<Topic>;
  topic?: Maybe<Topic>;
  /** Get a user by id. */
  user?: Maybe<User>;
  /** Get current authenticated user. */
  me?: Maybe<User>;
  partyScores: Array<ScoreResult>;
  voting?: Maybe<Voting>;
  chamberVoting?: Maybe<Voting>;
  arguments?: Maybe<ArgumentPaginator>;
  countries?: Maybe<CountryPaginator>;
  feedback?: Maybe<FeedbackPaginator>;
  legislatures?: Maybe<LegislaturePaginator>;
  opinions?: Maybe<OpinionPaginator>;
  parliaments?: Maybe<ParliamentPaginator>;
  proposals?: Maybe<ProposalPaginator>;
  statements?: Maybe<StatementPaginator>;
  /** Get all users. */
  users?: Maybe<UserPaginator>;
  votings?: Maybe<VotingPaginator>;
};


export type QueryArgumentArgs = {
  id: Scalars['Int'];
};


export type QueryChamberArgs = {
  id: Scalars['Int'];
};


export type QueryCountryArgs = {
  id: Scalars['Int'];
};


export type QueryLegislatureArgs = {
  id: Scalars['Int'];
};


export type QueryOpinionArgs = {
  id: Scalars['Int'];
};


export type QueryParliamentArgs = {
  id: Scalars['Int'];
};


export type QueryPartyArgs = {
  id: Scalars['Int'];
};


export type QueryProposalScheduleEntriesArgs = {
  where?: Maybe<QueryProposalScheduleEntriesWhereWhereConditions>;
};


export type QueryProposalArgs = {
  id: Scalars['Int'];
};


export type QueryStatementArgs = {
  id: Scalars['Int'];
};


export type QueryUsersPerWeekArgs = {
  start: Scalars['Date'];
  end: Scalars['Date'];
};


export type QueryTopicsArgs = {
  where?: Maybe<QueryTopicsWhereWhereConditions>;
  orderBy?: Maybe<Array<QueryTopicsOrderByOrderByClause>>;
};


export type QueryTopicArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryVotingArgs = {
  id: Scalars['Int'];
};


export type QueryChamberVotingArgs = {
  proposal_id: Scalars['Int'];
  chamber_id: Scalars['Int'];
};


export type QueryArgumentsArgs = {
  where?: Maybe<QueryArgumentsWhereWhereConditions>;
  orderBy?: Maybe<Array<QueryArgumentsOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryCountriesArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryFeedbackArgs = {
  where?: Maybe<QueryFeedbackWhereWhereConditions>;
  orderBy?: Maybe<Array<QueryFeedbackOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryLegislaturesArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryOpinionsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryParliamentsArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryProposalsArgs = {
  where?: Maybe<QueryProposalsWhereWhereConditions>;
  orderBy?: Maybe<Array<QueryProposalsOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryStatementsArgs = {
  where?: Maybe<QueryStatementsWhereWhereConditions>;
  orderBy?: Maybe<Array<QueryStatementsOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryVotingsArgs = {
  where?: Maybe<QueryVotingsWhereWhereConditions>;
  orderBy?: Maybe<Array<QueryVotingsOrderByOrderByClause>>;
  first?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

/** Allowed column names for the `orderBy` argument on field `arguments` on type `Query`. */
export enum QueryArgumentsOrderByColumn {
  Id = 'ID',
  Statement = 'STATEMENT'
}

/** Order by clause for the `orderBy` argument on the query `arguments`. */
export type QueryArgumentsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryArgumentsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `where` argument on field `arguments` on type `Query`. */
export enum QueryArgumentsWhereColumn {
  Statement = 'STATEMENT'
}

/** Dynamic WHERE conditions for the `where` argument on the query `arguments`. */
export type QueryArgumentsWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryArgumentsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryArgumentsWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryArgumentsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryArgumentsWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `arguments`. */
export type QueryArgumentsWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryArgumentsWhereWhereConditions>;
};

/** Allowed column names for the `orderBy` argument on field `feedback` on type `Query`. */
export enum QueryFeedbackOrderByColumn {
  Id = 'ID',
  Feedback = 'FEEDBACK'
}

/** Order by clause for the `orderBy` argument on the query `feedback`. */
export type QueryFeedbackOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryFeedbackOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `where` argument on field `feedback` on type `Query`. */
export enum QueryFeedbackWhereColumn {
  Feedback = 'FEEDBACK'
}

/** Dynamic WHERE conditions for the `where` argument on the query `feedback`. */
export type QueryFeedbackWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryFeedbackWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryFeedbackWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryFeedbackWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryFeedbackWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `feedback`. */
export type QueryFeedbackWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryFeedbackWhereWhereConditions>;
};

/** Allowed column names for the `where` argument on field `proposalScheduleEntries` on type `Query`. */
export enum QueryProposalScheduleEntriesWhereColumn {
  ShowAt = 'SHOW_AT'
}

/** Dynamic WHERE conditions for the `where` argument on the query `proposalScheduleEntries`. */
export type QueryProposalScheduleEntriesWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryProposalScheduleEntriesWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryProposalScheduleEntriesWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryProposalScheduleEntriesWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryProposalScheduleEntriesWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `proposalScheduleEntries`. */
export type QueryProposalScheduleEntriesWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryProposalScheduleEntriesWhereWhereConditions>;
};

/** Allowed column names for the `orderBy` argument on field `proposals` on type `Query`. */
export enum QueryProposalsOrderByColumn {
  Id = 'ID',
  Title = 'TITLE',
  Statement = 'STATEMENT'
}

/** Order by clause for the `orderBy` argument on the query `proposals`. */
export type QueryProposalsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryProposalsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `where` argument on field `proposals` on type `Query`. */
export enum QueryProposalsWhereColumn {
  Id = 'ID',
  Title = 'TITLE',
  Statement = 'STATEMENT',
  ShortStatement = 'SHORT_STATEMENT',
  Active = 'ACTIVE'
}

/** Dynamic WHERE conditions for the `where` argument on the query `proposals`. */
export type QueryProposalsWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryProposalsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryProposalsWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryProposalsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryProposalsWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `proposals`. */
export type QueryProposalsWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryProposalsWhereWhereConditions>;
};

/** Allowed column names for the `orderBy` argument on field `statements` on type `Query`. */
export enum QueryStatementsOrderByColumn {
  Id = 'ID',
  Title = 'TITLE',
  Statement = 'STATEMENT'
}

/** Order by clause for the `orderBy` argument on the query `statements`. */
export type QueryStatementsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryStatementsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `where` argument on field `statements` on type `Query`. */
export enum QueryStatementsWhereColumn {
  Id = 'ID',
  Title = 'TITLE',
  Statement = 'STATEMENT',
  ShortStatement = 'SHORT_STATEMENT',
  Active = 'ACTIVE'
}

/** Dynamic WHERE conditions for the `where` argument on the query `statements`. */
export type QueryStatementsWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryStatementsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryStatementsWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryStatementsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryStatementsWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `statements`. */
export type QueryStatementsWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryStatementsWhereWhereConditions>;
};

/** Allowed column names for the `orderBy` argument on field `topics` on type `Query`. */
export enum QueryTopicsOrderByColumn {
  Id = 'ID',
  Title = 'TITLE'
}

/** Order by clause for the `orderBy` argument on the query `topics`. */
export type QueryTopicsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryTopicsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `where` argument on field `topics` on type `Query`. */
export enum QueryTopicsWhereColumn {
  Title = 'TITLE'
}

/** Dynamic WHERE conditions for the `where` argument on the query `topics`. */
export type QueryTopicsWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryTopicsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryTopicsWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryTopicsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryTopicsWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `topics`. */
export type QueryTopicsWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryTopicsWhereWhereConditions>;
};

/** Allowed column names for the `orderBy` argument on field `votings` on type `Query`. */
export enum QueryVotingsOrderByColumn {
  Id = 'ID',
  Outcome = 'OUTCOME'
}

/** Order by clause for the `orderBy` argument on the query `votings`. */
export type QueryVotingsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryVotingsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for the `where` argument on field `votings` on type `Query`. */
export enum QueryVotingsWhereColumn {
  Id = 'ID',
  VotingId = 'VOTING_ID',
  Outcome = 'OUTCOME'
}

/** Dynamic WHERE conditions for the `where` argument on the query `votings`. */
export type QueryVotingsWhereWhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<QueryVotingsWhereColumn>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<QueryVotingsWhereWhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<QueryVotingsWhereWhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<QueryVotingsWhereWhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE conditions for the `where` argument on the query `votings`. */
export type QueryVotingsWhereWhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<QueryVotingsWhereWhereConditions>;
};

export type RegistrationResponse = {
  __typename?: 'RegistrationResponse';
  status: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  users: Array<User>;
};

/** The available SQL operators that are used to filter query results. */
export enum SqlOperator {
  /** Equal operator (`=`) */
  Eq = 'EQ',
  /** Not equal operator (`!=`) */
  Neq = 'NEQ',
  /** Greater than operator (`>`) */
  Gt = 'GT',
  /** Greater than or equal operator (`>=`) */
  Gte = 'GTE',
  /** Less than operator (`<`) */
  Lt = 'LT',
  /** Less than or equal operator (`<=`) */
  Lte = 'LTE',
  /** Simple pattern matching (`LIKE`) */
  Like = 'LIKE',
  /** Negation of simple pattern matching (`NOT LIKE`) */
  NotLike = 'NOT_LIKE',
  /** Whether a value is within a set of values (`IN`) */
  In = 'IN',
  /** Whether a value is not within a set of values (`NOT IN`) */
  NotIn = 'NOT_IN',
  /** Whether a value is within a range of values (`BETWEEN`) */
  Between = 'BETWEEN',
  /** Whether a value is not within a range of values (`NOT BETWEEN`) */
  NotBetween = 'NOT_BETWEEN',
  /** Whether a value is null (`IS NULL`) */
  IsNull = 'IS_NULL',
  /** Whether a value is not null (`IS NOT NULL`) */
  IsNotNull = 'IS_NOT_NULL'
}

export type ScoreResult = {
  __typename?: 'ScoreResult';
  score: Scalars['Float'];
  party: Party;
  topics: Array<TopicResult>;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Statement = {
  __typename?: 'Statement';
  id: Scalars['Int'];
  topic_id: Scalars['Int'];
  title: Scalars['String'];
  statement: Scalars['String'];
  short_statement: Scalars['String'];
  explanation: Scalars['String'];
  source_of_explanation: Scalars['String'];
  active: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  topic: Topic;
  arguments: Array<Argument>;
  opinions: Array<Opinion>;
};

/** A paginated list of Statement items. */
export type StatementPaginator = {
  __typename?: 'StatementPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Statement items. */
  data: Array<Statement>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['Int'];
  title: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  proposals: Array<Proposal>;
};

export type TopicResult = {
  __typename?: 'TopicResult';
  topic: Topic;
  score: Scalars['Float'];
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpsertArgumentInput = {
  position: ArgumentPosition;
  statement: Scalars['String'];
  source: Scalars['String'];
  stated_at?: Maybe<Scalars['Date']>;
  parties?: Maybe<CreatePartyBelongsToMany>;
  proposals?: Maybe<CreateProposalBelongsToMany>;
};

export type UpsertChildVotingsHasMany = {
  upsert: Array<UpsertVotingInput>;
};

export type UpsertOpinionInput = {
  opinionable_id: Scalars['Int'];
  opinionable_type: Scalars['String'];
  position: OpinionResult;
};

export type UpsertProposalInput = {
  topic_id: Scalars['Int'];
  title: Scalars['String'];
  type: ProposalType;
  statement: Scalars['String'];
  short_statement: Scalars['String'];
  explanation: Scalars['String'];
  inverted: Scalars['Boolean'];
  active: Scalars['Boolean'];
  source_of_explanation: Scalars['String'];
  source_of_proposal: Scalars['String'];
  arguments?: Maybe<CreateArgumentBelongsToMany>;
};

export type UpsertProposalScheduleEntryInput = {
  proposal_id: Scalars['Int'];
  show_at: Scalars['Date'];
};

export type UpsertStatementInput = {
  topic_id: Scalars['Int'];
  title: Scalars['String'];
  statement: Scalars['String'];
  short_statement: Scalars['String'];
  explanation: Scalars['String'];
  source_of_explanation: Scalars['String'];
  active: Scalars['Boolean'];
  arguments?: Maybe<CreateArgumentBelongsToMany>;
};

export type UpsertTopicInput = {
  title: Scalars['String'];
  icon: Scalars['String'];
  description: Scalars['String'];
};

export type UpsertVotingInput = {
  id?: Maybe<Scalars['Int']>;
  voting_id?: Maybe<Scalars['Int']>;
  legislature_id: Scalars['Int'];
  proposal_id: Scalars['Int'];
  chamber_id: Scalars['Int'];
  party_id?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  outcome: VotingOutcome;
  carried_out_at: Scalars['Date'];
  childVotings?: Maybe<UpsertChildVotingsHasMany>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  statement_progress: Scalars['Int'];
  openProposals: Array<Proposal>;
  doneProposals: Array<Proposal>;
  opinions: Array<Opinion>;
  roles: Array<Role>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of User items. */
  data: Array<User>;
};

export type UserVerificationResponse = {
  __typename?: 'UserVerificationResponse';
  status: Scalars['Boolean'];
};

export type Voting = {
  __typename?: 'Voting';
  id: Scalars['Int'];
  voting_id?: Maybe<Scalars['Int']>;
  legislature_id: Scalars['Int'];
  proposal_id: Scalars['Int'];
  chamber_id: Scalars['Int'];
  party_id?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  outcome: VotingOutcome;
  carried_out_at: Scalars['Date'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  parentVoting?: Maybe<Voting>;
  childVotings: Array<Voting>;
  proposal: Proposal;
  chamber: Chamber;
  party?: Maybe<Party>;
};

export enum VotingOutcome {
  Yes = 'YES',
  No = 'NO',
  Abstained = 'ABSTAINED',
  Absent = 'ABSENT'
}

/** A paginated list of Voting items. */
export type VotingPaginator = {
  __typename?: 'VotingPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Voting items. */
  data: Array<Voting>;
};

export type WeekUserCount = {
  __typename?: 'WeekUserCount';
  week: Scalars['Int'];
  count: Scalars['Int'];
};

/** Dynamic WHERE conditions for queries. */
export type WhereConditions = {
  /** The column that is used for the condition. */
  column?: Maybe<Scalars['String']>;
  /** The operator that is used for the condition. */
  operator?: Maybe<SqlOperator>;
  /** The value that is used for the condition. */
  value?: Maybe<Scalars['Mixed']>;
  /** A set of conditions that requires all conditions to match. */
  AND?: Maybe<Array<WhereConditions>>;
  /** A set of conditions that requires at least one condition to match. */
  OR?: Maybe<Array<WhereConditions>>;
  /** Check whether a relation exists. Extra conditions or a minimum amount can be applied. */
  HAS?: Maybe<WhereConditionsRelation>;
};

/** Dynamic HAS conditions for WHERE condition queries. */
export type WhereConditionsRelation = {
  /** The relation that is checked. */
  relation: Scalars['String'];
  /** The comparison operator to test against the amount. */
  operator?: Maybe<SqlOperator>;
  /** The amount to test. */
  amount?: Maybe<Scalars['Int']>;
  /** Additional condition logic. */
  condition?: Maybe<WhereConditions>;
};
