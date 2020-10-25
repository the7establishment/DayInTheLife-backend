var express = require('express')
var router = express.Router()

const user_controller = require('./user.controller')

router.get('/', user_controller.get)
router.post('/', user_controller.post)

module.exports = router