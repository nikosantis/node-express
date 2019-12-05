const expres = require('express')
const routes = expres.Router()

const products = [
  {
    name: 'Red shoes',
    price: 75
  },
  {
    name: 'Black bik'
  }
]

routes.get('/', function(req, res) {
  res.render('products', { products })
})

module.exports = routes
