'use strict';
const webpack = require('webpack');

const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common.js');

// Ответвления от common конфигурации, нужны исключительно для dev-server
module.exports = merge(common, {
  mode: 'development',
  target: "web",
  entry: [
    // Нужно для "горяей" загрузки модулей и оверлея ошибок
    'react-dev-utils/webpackHotDevClient',
    paths.appEntry
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
    disableHostCheck: false,
    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    port: 3000,
    publicPath: '/',
    hot: true,
    overlay: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    transportMode: 'ws',
    injectClient: false,
  },
});
