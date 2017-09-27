// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const baseConfig = require('../../build/webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"',
      'process.env.NODE_ENV': '"test"'
    })
  ]
})
module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
