const mongoose = require('mongoose')
require('dotenv/config')
const db = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });1
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDB