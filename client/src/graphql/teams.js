import gql from 'graphql-tag'

export const GET_TEAM = gql`
  query team($teamId: String!) {
    team(teamId: $teamId) {
      id
      name
      users {
        name
        email
      }
      topics
    }

    sessions {
      id
      teamId
    }
  }
`

export const GET_TEAM_WITH_SESSIONS = gql`
  query teamWithSessions($teamId: String!) {
    team(teamId: $teamId) {
      id
      name
    }

    teamSessions(teamId: $teamId) {
      id
      created
      topics {
        topicId
        trend
        overall
        votes {
          value
        }
        details {
          name
          icon
        }
      }
    }

    teamTopics(teamId: $teamId) {
      id
      name
      icon
    }
  }
`

export const GET_HEALTH_TEAM = gql`
  query teamForHealthCheck($teamId: String!) {
    teamForHealthCheck(teamId: $teamId) {
      id
      name
      users {
        id
        name
        email
      }
      topics {
        id
        name
        icon
        bestCase
        worstCase
      }
    }
  }
`

export const GET_TEAMS = gql`
  query {
    teams {
      id
      name
    }
  }
`

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
