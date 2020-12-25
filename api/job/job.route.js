var express = require('express')
var router = express.Router()
const job_controller = require('./job.controller')

// router.get('/', job_controller.get)
router.get('/:keyword', job_controller.getByKeyword)
router.get('/description/:onetCode/:location', job_controller.getJobDescriptionByOnetCode)
router.get('/salary/:keyword/:location', job_controller.getSalariesByOccupationAndLocation)
router.get('/tools/:onetCode', job_controller.getToolsAndTechByOccupation)

module.exports = router