const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const dotenv = require('dotenv');

const common = require('./webpack.common.js');
const getConfigModuleFederation = require('./getConfigModuleFederation.js');

const { DefinePlugin } = webpack;
const { ModuleFederationPlugin } = webpack.container;

dotenv.config({
  path: path.resolve(__dirname, '../.env.prod')
});

module.exports = () =>
  merge(common, {
    mode: 'production',
    plugins: [
      new DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),
      new ModuleFederationPlugin(getConfigModuleFederation())
    ],
    devtool: false,
    output: {
      path: path.resolve(__dirname, '../build/'),
      chunkFilename: '[id].[name].[contenthash:8].chunk.js',
      filename: '[id].[name].[contenthash:8].bundle.js',
      publicPath: 'auto',
      crossOriginLoading: 'anonymous',
      clean: true
    }
  });
