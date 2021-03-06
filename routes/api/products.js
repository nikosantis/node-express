const express = require('express')
const passport = require('passport')
const ProductService = require('../../services/products')

const Joi = require('@hapi/joi')
const validationHandler = require('../../utils/middlewares/validationHandler')

const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
} = require('../../utils/schemas/products')

// JWT strategy
require('../../utils/auth/strategies/jwt')

const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time')

function productsApi(app) {
  const router = express.Router()
  app.use('/api/products', router)

  const productService = new ProductService()

  router.get('/', async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
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
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
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

  router.post('/', validationHandler(createProductSchema), async function(req, res, next) {
    const { body: product } = req

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

  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler(Joi.object({ productId: productIdSchema }), 'params'),
    validationHandler(updateProductSchema),
    async function(req, res, next) {
    const { productId } = req.params
    const { body: product } = req

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

  router.delete(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    async function(req, res, next) {
    const { productId } = req.params
    const { body: product } = req

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

}

module.exports = productsApi
