'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:9110"',
  OSS_PATH: '"https://zhku-school-bucket01.oss-cn-beijing.aliyuncs.com"'
})
