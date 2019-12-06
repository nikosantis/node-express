const express = require('express')
const router = express.Router()
const ProductService = require('../../services/products')

const productService = new ProductService()

router.get('/', async function(req, res, next) {
  const { tags } = req.query

  console.log(`req: ${JSON.stringify(req.query)}`)

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

  console.log(`req: ${JSON.stringify(req.params)}`)

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

  console.log(`req: ${JSON.stringify(req.body)}`)

  try {
    const createdProduct = await productService.createProduct({ product })

    res.status(201).json({
      data: createdProduct,
      message: 'product created'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async function(req, res, next) {
  const { productId } = req.params
  const { body: product } = req

  console.log(`req: ${JSON.stringify(req.body)} ${JSON.stringify(req.params)}`)

  try {
    const updatedProduct = await productService.updateProduct({ productId, product })

    res.status(200).json({
      data: updatedProduct,
      message: 'product updated'
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async function(req, res, next) {
  const { productId } = req.params
  const { body: product } = req

  console.log(`req: ${JSON.stringify(req.params)}`)

  try {
    const deletedProduct = await productService.deleteProduct({ productId, product })

    res.status(200).json({
      data: deletedProduct,
      message: 'product deleted'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
