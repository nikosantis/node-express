const expres = require('express')
const routes = expres.Router()
const productMocks = require('../utils/mocks/products')

routes.get('/', function(req, res) {
  res.render('products', { products })
})

module.exports = routes
