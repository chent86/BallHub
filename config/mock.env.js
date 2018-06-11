'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"mock"',
  // BASE_API: '"https://easy-mock.com/mock/5b1a93b1a547232216e80ebc/ball"',
  BASE_API: '"http://localhost:8000/"'
})
