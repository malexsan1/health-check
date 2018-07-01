import gql from 'graphql-tag'

export const ADD_TEAM = gql`
  mutation addTeam($team: TeamInput) {
    addTeam(team: $team) {
      id
      name
      users {
        name
        email
      }
      topics
    }
  }
`
