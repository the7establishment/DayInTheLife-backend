var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  fullName: String,
  firstName: String,
  lastName: String,
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  title: String,
  timeAt: {
    type: Number,
  },
  location: String,
  homeTown: String,
  image: String
})

module.exports = mongoose.model('user', userSchema)