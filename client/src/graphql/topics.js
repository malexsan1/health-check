import gql from 'graphql-tag'

export const GET_TOPICS = gql`
  {
    topics {
      id
      name
      bestCase
      worstCase
      icon
    }
  }
`
