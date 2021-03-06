'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const mockWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.mock.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for mock
  devtool: config.mock.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.mock.host,
    port: PORT || config.mock.port,
    open: config.mock.autoOpenBrowser,
    overlay: config.mock.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.mock.assetsPublicPath,
    proxy: config.mock.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.mock.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/mock.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'BallHub Mock'
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.mock.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      mockWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      mockWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${mockWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.mock.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(mockWebpackConfig)
    }
  })
})
