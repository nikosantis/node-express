const express = require('express')
const supertest = require('supertest')

function testServer(router) {
  const app = express()
  router(app)
  return supertest(app)
}

module.exports = testServer
