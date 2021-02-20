const { json } = require('body-parser')
var mongoose = require('mongoose')
var uniqid = require('uniqid')
var UserModel = require('./user.model')

exports.get = async function (req, res) {
  const user = await UserModel.find()
  try {
    res.status(201).send(user)
    console.log(user)
  } catch (e) {
    res.status(500).send(err)
  }
}

exports.getById = function (req, res) {
  const id = req.params.userId
  console.log(`Id: ${id} being used`)
  UserModel.findOne({userId: id})
    .exec()
    .then(doc => {
      if (doc) {
        console.log(`Found user matching id: ${id}`)
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: `No valid entry found for provided ID: ${id}` })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}

exports.post = function (req, res) {
  var { firstName, lastName, fullName, email, password, gender, country, region, homeCountry, homeRegion} = req.body
  const user = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    userId: uniqid(),
    ...req.body
  })

  user.save()
    .then(result => {
      console.log(`User created successfully with the following id ${result._id}`)
      res.status(200).json({
        message: `User created successfully!`,
        createdUser: result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}