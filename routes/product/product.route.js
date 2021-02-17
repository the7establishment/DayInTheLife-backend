var express = require('express')
var router = express.Router()

const product_controller = require('./product.controller')

router.get('/', product_controller.get)

router.post('/', product_controller.post)

module.exports = router