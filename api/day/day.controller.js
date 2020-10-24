var mongoose = require('mongoose')
var DayModal = require('./day.modal')

exports.get = async function(req, res){
  const day = await DayModal.find()
  try{
    res.status(201).send(day)
    console.log(day)
  } catch(e) {
    res.status(500).send(e)
  }
}

exports.post = function (req,res) {
  const day = new DayModal({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    summary: req.body.summary
  })
  day.save()
  .then(result => {
    console.log(`Day(s) created successfully with the following id ${result._id}`)
    res.status(201).json({
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