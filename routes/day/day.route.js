var express = require('express')
var router = express.Router()

const day_controller = require('./day.controller')

router.get('/', day_controller.get)

router.post('/create', day_controller.post)

module.exports = router