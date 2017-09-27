const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const data_env = process.env.DATA_ENV || 'dev'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'styl': path.resolve(__dirname, '../src/styl'),
      'styl_var': path.resolve(__dirname, '../src/styl/__var.styl'),
      'styl_mixin': path.resolve(__dirname, '../src/styl/__mixin.styl'),
      'package': path.resolve(__dirname, '../package.json'),
      '@u':path.resolve(__dirname, '../src/utils'),
      '@c': path.resolve(__dirname, '../src/components'),
      '@v': path.resolve(__dirname, '../src/views'),
      '@p': path.resolve(__dirname, '../src/pages'),
      '@a': path.resolve(__dirname, '../src/api'),
      '@m': path.resolve(__dirname, '../src/mixin'),
      '@config': path.resolve(__dirname, '../config/'+data_env),
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          'css-loader',
          { loader: 'stylus-loader' }
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}
