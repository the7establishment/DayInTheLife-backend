var mongoose = require('mongoose')

var jobOverviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Missing Job Title']
  },
  description: {
    type: String,
    required: [true, 'Missing Job Description'],
    maxlength: 300
  },
  salary: {
    type: Number,
    required: [true, 'Missing Job Salary']
  },
  location: String,
  balance: Number,
  travel: Number,
  commute: Number
})

module.exports = mongoose.model('job-overview', jobOverviewSchema)