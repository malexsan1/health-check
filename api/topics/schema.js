const { gql } = require('apollo-server')

module.exports = gql`
  type Topic {
    id: String!
    name: String!
    bestCase: String
    worstCase: String
    icon: String
  }

  input TopicInput {
    name: String
    bestCase: String
    worstCase: String
    icon: String
  }

  extend type Query {
    topics: [Topic]
    teamTopics(teamId: String): [Topic]
  }

  extend type Mutation {
    addTopic(topic: TopicInput): Topic
  }

`
