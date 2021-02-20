var mongoose = require('mongoose')

var daySchema = new mongoose.Schema({
  dayId: Number,
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