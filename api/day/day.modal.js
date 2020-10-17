var mongoose = require('mongoose')

var daySchema = new mongoose.Schema({
  name: String,
  summary: String
})

module.exports = mongoose.model('day', daySchema)