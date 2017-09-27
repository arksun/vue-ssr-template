const base = require('./index')
const proto = base.proto
module.exports = Object.assign({}, base, {
  // data_env=prod
  
  cache: {
    max: 1000,
    maxAge: 900000
  },
})
