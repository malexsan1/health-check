const { gql } = require('apollo-server')

module.exports = gql`
  type Team {
    id: String!
    name: String!
    users: [User]
    topics: [String]
  }

  type HealthCheckTeam {
    id: String!
    name: String!
    users: [User]
    topics: [Topic]
  }

  type User {
    id: String
    name: String
    email: String
  }

  input TeamInput {
    name: String
    topics: [String]
    users: [UserInput]
  }

  input UserInput {
    id: String
    name: String
    email: String
  }

  extend type Query {
    teams: [Team]
    team(teamId: String!): Team
    teamForHealthCheck(teamId: String!): HealthCheckTeam
  }

  extend type Mutation {
    addTeam(team: TeamInput): Team
  }

`
