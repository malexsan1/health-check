const { gql } = require('apollo-server')

module.exports = gql`
  type Topic {
    _id: String!
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
  }

  extend type Mutation {
    addTopic(topic: TopicInput): Topic
  }

`
