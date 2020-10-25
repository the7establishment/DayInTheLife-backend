const { json } = require('body-parser')
var mongoose = require('mongoose')
var UserModal = require('./user.modal')

exports.get = async function(req, res){
  const user = await UserModal.find()
  try{
    res.status(201).send(user)
    console.log(user)
  } catch(e) {
    res.status(500).send(err)
  }
}

exports.post = function(req, res) {
  var { fullName, firstName, lastName, gender, title, timeAt, location, homeTown, image } = req.body
  const user = new UserModal({
    _id: new mongoose.Types.ObjectId(),
    fullName: fullName,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    title: title,
    timeAt: timeAt,
    location: location,
    homeTown: homeTown,
    image: image
  })

  user.save()
  .then(result => {
    console.log(`User created successfully with the following id ${result._id}`)
    res.status(200)/json({
      message: `User created successfully!`,
      createdUser: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error:err
    })
  })
}