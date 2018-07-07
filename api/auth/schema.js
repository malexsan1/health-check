const { gql } = require('apollo-server')

module.exports = gql`
  input SignUpInput {
    email: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type AuthedUser {
    id: String
    email: String
    token: String
  }

  extend type Mutation {
    login(input: LoginInput): AuthedUser
    signUp(input: SignUpInput): AuthedUser
  }

`
