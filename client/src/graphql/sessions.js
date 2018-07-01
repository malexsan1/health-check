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
