var mongoose = require('mongoose')
var JobOverviewModal = require('./job-overview.modal')

exports.post = function (req,res) {
  var { title, description, salary, location, balance, travel, commute } = req.body

  const profile = new JobOverviewModal({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    salary: salary,
    location: location,
    balance: balance,
    travel: travel,
    commute: commute
  })
  profile.save()
  .then(result => {
    console.log(`JobOverview(s) created successfully with the following id ${result._id}`)
    res.status(201).json({
      message: "JobOverview(s) created successfuly!",
      createdJobOverview: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}