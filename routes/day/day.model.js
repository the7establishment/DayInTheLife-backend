var mongoose = require('mongoose')

var daySchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  title: String,
  company: String,
  travel: String,
  physical: String,
  worklife: String,
  workenv: String,
  salary: String,
  description: String
})

module.exports = mongoose.model('day', daySchema)