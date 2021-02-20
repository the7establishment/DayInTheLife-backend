var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  productType: String,
  categories: [
    {
      name: String,
      products: [
        {
          label: String,
          company: String
        }
      ]
    }
  ]
})

module.exports = mongoose.model('product', productSchema)