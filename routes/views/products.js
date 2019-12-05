const express = require('express')
const routes = express.Router()
const ProductService = require('../../services/products')

const productService = new ProductService()

routes.get('/', async function(req, res, next) {
  const { tags } = req.query

  try {
    const products = await productService.getProducts({ tags })
    res.render('products', { products })
  } catch (error) {
    next(error)
  }
})

module.exports = routes
