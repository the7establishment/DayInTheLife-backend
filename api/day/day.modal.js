var mongoose = require('mongoose')

var daySchema = new mongoose.Schema({
  job: String,
  company: String,
  items: [{
    label: String,
    body: String
  }]
})

module.exports = mongoose.model('day', daySchema)