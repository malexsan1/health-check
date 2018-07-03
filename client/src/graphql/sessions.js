import gql from 'graphql-tag'

export const SUBMIT_SESSION_VOTE = gql`
  mutation submitVote($session: SessionInput) {
    submitVote(session: $session) {
      id
      teamId
      topics {
        topicId
        trend
        overall
        votes {
          userId
          value
        }
      }
    }
  }
`

export const GET_SESSION = gql`
  query sessionById($sessionId: String!) {
    sessionById(sessionId: $sessionId) {
      id
      created
      topics {
        topicId
        trend
        overall
        details {
          name
          icon
        }
        votes {
          value
        }
      }
    }
  }
`
