const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true,
    min: 6
  },
  refreshToken: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', UserSchema)