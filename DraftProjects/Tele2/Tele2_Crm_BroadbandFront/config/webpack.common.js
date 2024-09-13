'use strict'

const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

const paths = require('./paths')

const getClientEnvironment = require('./env')
const env = getClientEnvironment('')

const hostAppAddress = env.raw.REACT_APP_HOST

const deps = require('../package.json').dependencies

// Общий конфиг Webpack
// Тут обозначены общие для продуктива и девелопа плагины и загрузчики
module.exports = {
  entry: paths.appEntry,
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    // ESLintPlugin проверяет код на соответствие правилам перед сборкой
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      emitError: true,
      failOnError: true,
      cache: true
    }),
    new ModuleFederationPlugin({
      name: 'crmBroadbandRemote',
      filename: 'remoteEntry.js',
      remotes: {
        crmHostApp: `crmHostApp@${hostAppAddress}/remoteEntry.js`
      },
      exposes: {
        './Broadband': paths.Broadband,
        './BroadbandJournal': paths.BroadbandJournal,
        './BroadbandSessions': paths.BroadbandSessions,
        './BroadbandShifts': paths.BroadbandShifts
      },
      shared: {
        react: { singleton: true, requiredVersion: deps['react'] },
        'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
        'react-router': { singleton: true, requiredVersion: deps['react-router'] },
        'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
        axios: { singleton: true, requiredVersion: deps['axios'] },
        antd: { singleton: true, requiredVersion: deps['antd'] },
        'styled-components': { singleton: true },
        moment: { singleton: true, requiredVersion: deps['moment'] }
      }    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appPublic}/favicon.ico`
    })
  ],
  module: {
    rules: [
      {
        // Загрузка всех скриптов
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-react', {
            "runtime": "automatic"
          }]],
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            [require.resolve("babel-plugin-styled-components"), { pure: true } ]
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      components: paths.components,
      constants: paths.constants,
      context: paths.context,
      helpers: paths.helpers,
      hooks: paths.hooks,
      utils: paths.utils,
    },
  }
}
