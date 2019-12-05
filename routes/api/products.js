const express = require('express')
const router = express.Router()
const ProductService = require('../../services/products')

const productService = new ProductService()

router.get('/', async function(req, res, next) {
  const { tags } = req.query
  try {
    const getProducts = await productService.getProducts({ tags })
    res.status(200).json({
      data: getProducts,
      message: 'products listed'
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async function(req, res, next) {
  const { productId } = req.params

  try {
    const getProduct = await productService.getProduct({ productId })

    res.status(200).json({
      data: getProduct,
      message: 'product retrieved'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async function(req, res, next) {
  const { body: product } = req

  try {
    const createProduct = await productService.createProduct({ product })

    res.status(201).json({
      data: createProduct,
      message: 'product created'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async function(req, res, next) {
  const { productId } = req.params
  const { body: product } = req

  try {
    const updateProduct = await productService.updateProduct({ productId, product })

    res.status(200).json({
      data: updateProduct,
      message: 'product updated'
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:productId', async function(req, res, next) {
  const { productId } = req.params
  const { body: product } = req

  try {
    const updateProduct = await productService.partialUpdateProduct({ productId, product })

    res.status(200).json({
      data: updateProduct,
      message: 'product updated'
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params
  const { body: product } = req

  try {
    const deleteProduct = await productService.deleteProduct({ productId, product })

    res.status(200).json({
      data: deleteProduct,
      message: 'product deleted'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
