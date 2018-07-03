const path = require('path')
const express = require('express')
const { merge } = require('lodash')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

const app = express()

const teams = require('./api/teams')
const topics = require('./api/topics')
const sessions = require('./api/sessions')

const models = require('./api/models')

const PORT = process.env.PORT || 4000
const dbURL = `mongodb://admin:hindawi2018@ds121251.mlab.com:21251/health-check`
mongoose.connect(dbURL).catch(console.log)

const isProduction = process.env.NODE_ENV === 'production'

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

const serverConfig = {
  typeDefs,
  resolvers,
  context: {
    ...models,
  },
}

const server = new ApolloServer(
  merge(
    {},
    serverConfig,
    isProduction
      ? {
          engine: {
            apiKey: process.env.ENGINE_API_KEY,
          },
        }
      : {},
  ),
)

if (isProduction) {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

server.applyMiddleware({ app })

app.listen(PORT, () => console.log(`Server ready on ${server.graphqlPath}`))
