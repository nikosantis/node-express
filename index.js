const express = require('express')
const slash = require('express-slash')
const path = require('path')
const bodyParser = require('body-parser')
const Boom = require('@hapi/boom')
const serveStatic = require('serve-static')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers')

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

// app
const app = express()

// middlewares
app.enable('strict routing')

app.use(bodyParser.json())

// statics files
app.use('/static', serveStatic(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// routes
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)

// redirect /
app.get('/', function(req, res) {
  res.redirect('/products')
})

app.use(function(req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload }
    } = Boom.notFound()

    res.status(statusCode).json(payload)
  }

  res.status(404).render('404')
})

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// server
const server = app.listen(8000, function() {
  console.log(`Listening http://localhost:${server.address().port}`)
})
