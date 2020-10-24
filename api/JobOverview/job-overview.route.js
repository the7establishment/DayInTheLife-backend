var express = require('express')
var router = express.Router()

const jobprofile_controller = require('./job-overview.controller')

router.get('/', jobprofile_controller.get)
router.get('/:id', jobprofile_controller.getById)
router.post('/', jobprofile_controller.post)
router.put('/:id', jobprofile_controller.put)

module.exports = router