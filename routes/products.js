const express = require('express')
const routes = express.Router()
const productMocks = require('../utils/mocks/products')

const products = productMocks

routes.get('/', function(req, res) {
  res.render('products', { products })
})

module.exports = routes
