var express = require('express')
var router = express.Router()

const jobprofile_controller = require('./job-overview.controller')

router.post('/', jobprofile_controller.post)

module.exports = router