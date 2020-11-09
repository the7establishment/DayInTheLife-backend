var express = require('express')
var router = express.Router()
const job_controller = require('./job.controller')

// router.get('/', job_controller.get)
router.get('/:keyword', job_controller.getByKeyword)

module.exports = router