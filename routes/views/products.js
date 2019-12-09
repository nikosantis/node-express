const express = require('express')
const routes = express.Router()
const ProductService = require('../../services/products')
const { config } = require('../../config')

const productService = new ProductService()

routes.get('/', async function(req, res, next) {
  const { tags } = req.query

  try {
    const products = await productService.getProducts({ tags })
    res.render('products', { products, dev: config.dev })
  } catch (error) {
    next(error)
  }
})

module.exports = routes
