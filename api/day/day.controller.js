var mongoose = require('mongoose')
var DayModal = require('./day.modal')

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
  var { job, company, items} = req.body
  const day = new DayModal({
    _id: new mongoose.Types.ObjectId(),
    job: job,
    company: company,
    items: items
  })
  day.save()
  .then(result => {
    console.log(`Day(s) created successfully with the following id ${result._id}`)
    res.status(200).json({
      message: `Day(s) created successfully!`,
      createdDay: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}