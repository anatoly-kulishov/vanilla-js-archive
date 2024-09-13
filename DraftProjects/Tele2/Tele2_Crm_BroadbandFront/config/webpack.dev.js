'use strict'
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common.js')

// Ответвления от common конфигурации, нужны исключительно для dev-server
module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  entry:   paths.appEntry,
  devtool: 'inline-source-map',
  output: {
    path: undefined,
    chunkFilename: '[id].[name].chunk.js',
    publicPath: 'auto',
    filename: '[name].[contenthash].bundle.js',
    pathinfo: false,
    crossOriginLoading: 'anonymous',
  },
  devServer: {
    client: {
      overlay: false
    },
    static: {
      directory: paths.appPublic
    },
    compress: true,
    port: 3001,
    hot: false,
    liveReload: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    webSocketServer: 'sockjs',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
})
