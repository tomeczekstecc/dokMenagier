const mongoose = require('mongoose')



const PinSchema = mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  usedUserID: {
    type: String,
    default: ''
  },
  dateUsed: {
    type: Date,
    default: '1970-01-01'
  }

})


module.exports = mongoose.model('pin', PinSchema)
