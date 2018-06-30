const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema({
  id: String,
  name: String,
  bestCase: String,
  worstCase: String,
  icon: String,
})

module.exports = mongoose.model('Topic', TopicSchema)
