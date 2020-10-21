const { Int32 } = require('mongodb')
var mongoose = require('mongoose')

var jobOverviewSchema = new mongoose.Schema({
  title: String,
  description: String,
  salary: Number,
  location: String,
  balance: Number,
  travel: Number,
  commute: Number
})

module.exports = mongoose.model('job-overview', jobOverviewSchema)