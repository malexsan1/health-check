const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  id: String,
  name: String,
  users: [
    {
      id: String,
      name: String,
      email: String,
    },
  ],
  topics: [],
})

module.exports = mongoose.model('Team', TeamSchema)
