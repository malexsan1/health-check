const mongoose = require('mongoose')
const graphqlHTTP = require("express-graphql")
const app = require('express')()

const { url } = require('./api/db/db')
mongoose.connect(url).catch(e => console.log(e))

const userSchema = require('./api/graphql/index').userSchema;
app.use('/graphql', graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}))

app.listen(3003, () => console.log('Server listening on port 3003...'))
