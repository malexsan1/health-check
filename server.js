// require('dotenv').config()
const path = require('path')
const express = require('express')
const { merge } = require('lodash')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

const app = express()

const auth = require('./api/auth')
const teams = require('./api/teams')
const topics = require('./api/topics')
const sessions = require('./api/sessions')

const models = require('./api/models')

const PORT = process.env.PORT || 4000
const DB_NAME = provess.env.DB_NAME
const DB_USER = provess.env.DB_USER
const DB_PASSWORD = provess.env.DB_PASSWORD

console.log('Connect with: ', DB_NAME, DB_USER, DB_PASSWORD)

const dbURL = `mongodb://${DB_USER}:${DB_PASSWORD}@ds121251.mlab.com:21251/${DB_NAME}`
mongoose.connect(dbURL).catch(console.log)

const isProduction = process.env.NODE_ENV === 'production'

const typeDefs = [
  gql`
    type Query
    type Mutation

  `,
  auth.schema,
  teams.schema,
  topics.schema,
  sessions.schema,
]

const resolvers = merge(
  {},
  auth.resolvers,
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
