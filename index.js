const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const Boom = require('@hapi/boom')
const debug = require('debug')('app:server')
const helmet = require('helmet')
const serveStatic = require('serve-static')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const authApiRouter = require('./routes/api/auth')

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
app.use(helmet())
app.use(bodyParser.json())

// statics files
app.use('/static', serveStatic(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())

// routes
app.use('/products', productsRouter)
productsApiRouter(app)
app.use('/api/auth', authApiRouter)

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
  debug(`Listening http://localhost:${server.address().port}`)
})
