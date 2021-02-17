var mongoose = require('mongoose')
var ProductModal = require('./product.model')

exports.get = async function (req, res) {
  const product = await ProductModal.find()
  try {
    res.status(201).send(product)
    console.log(product)
  } catch (e) {
    res.status(500).send(err)
  }
}

exports.post = function (req, res) {
  var { productType, categories } = req.body
  const product = new ProductModal({
    _id: new mongoose.Types.ObjectId(),
    productType: productType,
    categories: categories
  })
  product.save()
    .then(result => {
      console.log(`Product(s) created successfully with the following id ${result._id}`)
      res.status(200).json({
        message: `Product(s) created successfully!`,
        createdProduct: result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}