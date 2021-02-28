var mongoose = require('mongoose')
var DayModal = require('./day.model')

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
    // overview
    title: body.overview.jobTitle,
    company: body.overview.company,
    travel: body.overview.travel,
    physical: body.overview.physical,
    worklife: body.overview.worklife,
    workenv: body.overview.workenv,
    salary: body.overview.salary,
    // description
    description: body.description.text
  })
  day.save()
  .then(result => {
    console.log(`Day(s) created successfully with the following id ${result.dayId}`)
    res.status(200).json({
      message: `Day created successfully with ID: ${result.dayId}`,
      createdDay: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}