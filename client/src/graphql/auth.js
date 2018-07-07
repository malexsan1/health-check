import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      id
      token
      email
    }
  }
`

export const SIGNUP = gql`
  mutation signUp($input: SignUpInput) {
    signUp(input: $input) {
      id
      token
      email
    }
  }
`
