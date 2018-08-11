const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  created: { type: Date, default: new Date() },
  teamId: String,
  topics: [
    {
      topicId: String,
      trend: Number,
      overall: Number,
      comments: String,
      votes: [
        {
          userId: String,
          value: Number,
        },
      ],
    },
  ],
})

module.exports = mongoose.model('Session', SessionSchema)
