const express = require('express')
const router = express.Router()
const ProductService = require('../../services/products')

const productService = new ProductService()

router.get('/', function(req, res) {
  const { tags } = req.query

  const products = productService.getProducts({ tags })

  res.status(200).json({
    data: products,
    message: 'products listed'
  })
})

router.get('/:productId', function(req, res) {
  const { productId } = req.params

  const product = productService.getProduct({ productId })

  res.status(200).json({
    data: product,
    message: 'product retrieved'
  })
})

router.post('/', function(req, res) {
  const { body: product } = req
  const product = productService.createProduct({ product })

  res.status(201).json({
    data: product,
    message: 'product created'
  })
})

router.put('/:productId', function(req, res) {
  const { productId } = req.params
  const { body: product } = req
  const product = productService.updateProduct({ productId, product })

  res.status(200).json({
    data: product,
    message: 'product updated'
  })
})

router.delete('/:productId', function(req, res) {
  const { productId } = req.params
  const { body: product } = req
  const product = productService.updateProduct({ productId, product })

  res.status(200).json({
    data: product,
    message: 'product deleted'
  })
})

module.exports = router
