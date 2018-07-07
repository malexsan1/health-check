const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now() },
  email: String,
  passwordHash: String,
})

module.exports = mongoose.model('User', UserSchema)
