var express = require('express')
var router = express.Router()

const jobprofile_controller = require('./job-overview.controller')

router.get('/', jobprofile_controller.get)
router.get('/:id', jobprofile_controller.getId)
router.post('/', jobprofile_controller.post)

module.exports = router