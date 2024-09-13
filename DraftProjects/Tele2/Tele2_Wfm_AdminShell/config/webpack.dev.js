const webpack = require('webpack');
const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common');

require('dotenv').config({
  path: paths.dotenvLocal,
})

// Ответвления от common конфигурации, нужны исключительно для dev-server
module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP': JSON.stringify(process.env.app)
    }),
  ],
  entry: [
    // Нужно для "горяей" загрузки модулей и оверлея ошибок
    'react-dev-utils/webpackHotDevClient',
    paths.appEntry,
  ],
  devtool: 'inline-source-map',
  output: {
    path: undefined,
    chunkFilename: '[id].[name].chunk.js',
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
    pathinfo: false,
  },
  devServer: {
    open: true,
    disableHostCheck: false,
    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    port: 3012,
    publicPath: '/',
    hot: true,
    overlay: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    transportMode: 'ws',
    injectClient: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },
});
