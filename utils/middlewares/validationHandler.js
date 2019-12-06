const Boom = require('@hapi/boom')

function validation(data, schema) {
  const { error } = schema.validate(data)
  return error
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const error = validation(req[check], schema)
    error ? next(Boom.badRequest(error)) : next()
  }
}

module.exports = validationHandler
