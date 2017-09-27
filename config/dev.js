const base = require('./index')
const proto = base.proto
module.exports = Object.assign({}, base, {
  // data_env=dev

  cache: {
    max: 1000,
    maxAge: 30000
  },
})