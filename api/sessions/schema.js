const { gql } = require('apollo-server')

module.exports = gql`
  type Session {
    id: String!
    created: String
    teamId: String
    topics: [SessionTopic]
  }

  type SessionTopic {
    topicId: String!
    trend: Int
    overall: Int
    votes: [SessionVote]
    details: TopicDetails
  }

  type SessionVote {
    userId: String
    value: Int
  }

  type TopicDetails {
      name: String!
      icon: String!
  }

  input SessionVoteInput {
    userId: String
    value: Int
  }

  input SessionTopicInput {
    topicId: String!
    trend: Int
    overall: Int
    votes: [SessionVoteInput]
  }

  input SessionInput {
    teamId: String
    topics: [SessionTopicInput]
  }

  extend type Mutation {
    submitVote(session: SessionInput): Session
  }

  extend type Query {
    sessionById(sessionId: String!): Session
    teamSessions(teamId: String!): [Session]
    sessions: [Session]
  }
`
