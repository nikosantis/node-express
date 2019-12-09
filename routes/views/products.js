const express = require('express')
const routes = express.Router()
const ProductService = require('../../services/products')
const { config } = require('../../config')

const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS } = require('../../utils/time')

const productService = new ProductService()

routes.get('/', async function(req, res, next) {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
  const { tags } = req.query

  try {
    const products = await productService.getProducts({ tags })
    res.render('products', { products, dev: config.dev })
  } catch (error) {
    next(error)
  }
})

module.exports = routes
