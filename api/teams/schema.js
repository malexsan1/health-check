const { gql } = require('apollo-server')

module.exports = gql`
  type Team {
    _id: String!
    name: String!
    users: [User]
    topics: [String]
  }

  type User {
    name: String
    email: String
  }

  input TeamInput {
    name: String
    topics: [String]
    users: [UserInput]
  }

  input UserInput {
    name: String
    email: String
  }

  extend type Query {
    teams: [Team]
    team(teamId: String!): Team
  }

  extend type Mutation {
    addTeam(team: TeamInput): Team
  }

`
