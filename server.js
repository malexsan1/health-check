const { merge } = require('lodash')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

const teams = require('./api/teams')
const topics = require('./api/topics')
const sessions = require('./api/sessions')

const models = require('./api/models')

const PORT = process.env.PORT || 4000
const dbURL = `mongodb://admin:hindawi2018@ds121251.mlab.com:21251/health-check`
mongoose.connect(dbURL).catch(console.log)

const typeDefs = [
  gql`
    type Query
    type Mutation

  `,
  teams.schema,
  topics.schema,
  sessions.schema,
]

const resolvers = merge(
  {},
  teams.resolvers,
  topics.resolvers,
  sessions.resolvers,
)

const server = new ApolloServer({
  engine: {
    apiKey: 'service:malexsan1-2532:Tb5Z2bsJ5RtUmgcQKPkl-A',
  },
  typeDefs,
  resolvers,
  context: {
    ...models,
  },
})

server
  .listen({
    port: PORT,
  })
  .then(({ url }) => console.log(`Server ready on ${url}...`))
