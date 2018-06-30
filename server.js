const { merge } = require('lodash')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

const teams = require('./api/teams')
const models = require('./api/models')

const dbURL = `mongodb://admin:hindawi2018@ds121251.mlab.com:21251/health-check`
mongoose.connect(dbURL).catch(console.log)

const typeDefs = [
  gql`
    type Query
    type Mutation

  `,
  teams.schema,
]

const resolvers = merge({}, teams.resolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    ...models,
  },
})

server.listen().then(({ url }) => console.log(`Server ready on ${url}...`))
