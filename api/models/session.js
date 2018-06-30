const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    id: String,
    created: { type: Date, default: Date.now },
    teamId: String,
    topics: [
      {
        topicId: String,
        trend: Number,
        votes: [
          {
            userId: String,
            value: Number,
          }
        ]
      }
    ]
})

module.exports = mongoose.model('Topic', TopicSchema);