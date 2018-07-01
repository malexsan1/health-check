import gql from 'graphql-tag'

export const GET_TOPICS = gql`
  {
    topics {
      _id
      name
      bestCase
      worstCase
      icon
    }
  }
`
