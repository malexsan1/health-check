const { gql } = require('apollo-server')

module.exports = gql`
  type Session {
    id: String!
    teamId: String
    topics: [SessionTopic]
  }

  type SessionTopic {
    topicId: String!
    trend: Int
    overall: Int
    votes: [SessionVote]
  }

  type SessionVote {
    userId: String
    value: Int
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

`
