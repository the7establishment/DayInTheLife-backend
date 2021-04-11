var express = require('express')
var router = express.Router()

const day_controller = require('./day.controller')

router.get('/user/:userId', day_controller.getByUserId)

router.post('/', day_controller.post)

module.exports = router