const productMocks = require('../utils/mocks/products')

class ProductsService {
  constructor() {

  }

  getProducts({ tags }) {
    return Promise.resolve(productMocks)
  }

  getProduct({ productId }) {
    return Promise.resolve(productMocks[0])
  }

  createProduct({ product }) {
    return Promise.resolve(productMocks[0])
  }

  updateProduct({ productId, product }) {
    return Promise.resolve(productMocks[0])
  }

  partialUpdateProduct({ productId, product }) {
    return Promise.resolve(productMocks[0])
  }

  deleteProduct({ productId, product }) {
    return Promise.resolve(productMocks[0])
  }
}

module.exports = ProductsService