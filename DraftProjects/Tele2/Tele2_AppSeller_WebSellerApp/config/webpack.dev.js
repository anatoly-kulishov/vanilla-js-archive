const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const dotenv = require('dotenv');

const common = require('./webpack.common.js');
const getConfigModuleFederation = require('./getConfigModuleFederation.js');

const { DefinePlugin } = webpack;
const { ModuleFederationPlugin } = webpack.container;

dotenv.config({
  path: path.resolve(__dirname, '../.env.dev')
});

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new ModuleFederationPlugin(getConfigModuleFederation())
  ],
  devtool: 'inline-source-map',
  output: {
    path: undefined,
    chunkFilename: '[id].[name].chunk.js',
    filename: '[name].[contenthash].bundle.js',
    crossOriginLoading: 'anonymous',
    clean: true
  },
  devServer: {
    port: 3002,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
        errors: false
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
});
