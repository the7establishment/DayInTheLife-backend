var mongoose = require('mongoose')
var DayModal = require('./day.model')

const SERVICE_DOWN_MESSAGE = 'Service is not available at this time. Please try again later.'

exports.get = async function(req, res){
  const day = await DayModal.find()
  try{
    res.status(201).send(day)
    console.log(day)
  } catch(e) {
    res.status(500).send(err)
  }
}

exports.post = function (req,res) {
  var body = req.body
  const day = new DayModal({
    _id: new mongoose.Types.ObjectId(),
    userId: mongoose.Types.ObjectId(body.userId),
    // overview
    title: body.jobTitle,
    company: body.company,
    travel: body.travel,
    physical: body.physical,
    worklife: body.worklife,
    workenv: body.workenv,
    salary: body.salary,
    // description
    description: body.description
  })
  day.save()
  .then(result => {
    console.log(`Day(s) created successfully with the following id ${result._id}`)
    res.status(200).json({
      dayId: result._id
    })
  })
  .catch(err => {
    res.status(500).json({
      message: SERVICE_DOWN_MESSAGE,
      error: err
    })
  })
}