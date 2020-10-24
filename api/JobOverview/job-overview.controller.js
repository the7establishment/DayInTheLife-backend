var mongoose = require('mongoose')
var JobOverviewModal = require('./job-overview.modal')

exports.get = async function (req, res) {
  const jobOverview = await JobOverviewModal.find()
  try {
    res.status(200).send(jobOverview)
    console.log(jobOverview)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.getById = function (req, res) {
  const id = req.params.id
  JobOverviewModal.findById(id)
    .exec()
    .then(overview => {
      if (overview) {
        console.log(`Found overview matching id: ${id}`)
        res.status(200).json(overview)
      }
      else {
        res.status(404).json({ message: `No overviews found matching id: ${id}` })
      }
    })
    .catch(err => {
      if (id.length < 24) {
        console.log(`Argument passed in must be a single String of 12 bytes or a string of 24 hex characters \n string: ${id} \n length ${id.length}`)
        res.status(403).json(
          {
            Reason: "Argument passed in must be a single  string of 24 hex characters",
            string: id,
            stringLength: id.length
          })
      }
      else {
        console.log(err)
        res.status(500).json({ err })
      }
    })
}

exports.post = function (req, res) {
  var { title, description, salary, location, balance, travel, commute } = req.body

  const overview = new JobOverviewModal({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    salary: salary,
    location: location,
    balance: balance,
    travel: travel,
    commute: commute
  })
  overview.save()
    .then(result => {
      console.log(`JobOverview(s) created successfully with the following id ${result._id}`)
      res.status(200).json({
        message: "JobOverview(s) created successfuly!",
        createdJobOverview: result
      })
    })
    .catch(err => {
      if (err.message.includes("validation failed")) {
        console.log(err.message)
        res.status(403).json(err.errors)
      }
      else {
        res.status(500).json({ error: err })
      }
    })
}

exports.put = function (req, res) {
  const id = req.params.id
  var { title, description, salary, location, balance, travel, commute } = req.body
  const overview = new JobOverviewModal({
    _id: id,
    title: title,
    description: description,
    salary: salary,
    location: location,
    balance: balance,
    travel: travel,
    commute: commute
  })
  JobOverviewModal.findByIdAndUpdate(id, overview, {new: true},
    (err, overview)=> {
      if(err) 
        return res.status(500).send(err)
      else{
        console.log(`Successfully found and updated id ${id}`)
        return res.status(200).send(overview);
      } 
    })
}