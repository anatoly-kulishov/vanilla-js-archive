'use strict'

const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin')
const { ModuleFederationPlugin } = require('webpack').container
// const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const paths = require('./paths')

const getClientEnvironment = require('./env')
const env = getClientEnvironment('')

const deps = require('../package.json').dependencies

const broadbandRemoteAddress = process.env.REACT_APP_BROADBAND_FE
const websellerRemoteAddress = process.env.REACT_APP_WEBSELLER_FE

// Общий конфиг Webpack
// Тут обозначены общие для продуктива и девелопа плагины и загрузчики
module.exports = {
  entry: paths.appEntry,
  plugins: [
    // DefinePlugin необходим для работы .env файлов
    new webpack.DefinePlugin(env.stringified),
    // ESLintPlugin проверяет код на соответствие правилам перед сборкой
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      emitError: true,
      failOnError: true,
      cache: true
    }),
    // Очищает папку с билдом
    new CleanWebpackPlugin(),
    // Минифицирование всех CSS
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css'
    }),
    // HotModuleReplacementPlugin необходим для автоматической загрузки изменные модулей во время разработки
    // работает только при NODE_ENV === 'development'
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new ModuleFederationPlugin({
      name: 'crmHostApp',
      filename: 'remoteEntry.js',
      remotes: {
        crmBroadbandRemote: `crmBroadbandRemote@${broadbandRemoteAddress}/remoteEntry.js`,
        websellerRemote: `websellerRemote@${websellerRemoteAddress}/remoteEntry.js`
      },
      exposes: {
        './components/Card': `${paths.components}/Card`,
        './components/MsisdnInput': `${paths.components}/MsisdnMask`,
        './containers/RatingMenu': `${paths.containers}/RatingMenu`,
        './containers/RatingMenu/shouldRate': `${paths.containers}/RatingMenu/shouldRate`,
        './hocs/AuthenticatedFileLink': `${paths.hocs}/AuthenticatedFileLink/AuthenticatedFileLink`,
        './utils/helpers': `${paths.utils}/helpers`
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: deps['react'] },
        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] },
        'react-router': { singleton: true, eager: true, requiredVersion: deps['react-router'] },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: deps['react-router-dom'] },
        axios: { singleton: true, eager: true, requiredVersion: deps['axios'] },
        antd: { singleton: true, eager: true, requiredVersion: deps['antd'] },
        'styled-components': { eager: true },
        moment: { eager: true }
      }
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appPublic}/favicon.ico`
    }),
    new RetryChunkLoadPlugin({
      maxRetries: 3
    })
  ],
  module: {
    rules: [
      {
        // Нужно для bootsraping`а (Webpack Federation)
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true
        }
      },
      {
        // Загрузка всех скриптов
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            // Позволяет оставлять имена для компонентов, объявленных при помощи styled-components
            // Нужно для тестов
            [require.resolve('babel-plugin-styled-components'), { pure: true }],
            // Необходим для импорта svg файлов как ReactComponent (legacy)
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                  }
                }
              }
            ]
          ]
        }
      },
      {
        // Загрузка остальных файлов
        oneOf: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
          // TODO: Refactor svg import in Interaction.js
          // {
          //   test: /\.svg$/,
          //   enforce: 'pre',
          //   use: ['@svgr/webpack'],
          // },
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    // Позволяет использовать переменные в .less файлах
                    // Нужно для ant design
                    javascriptEnabled: true
                  }
                }
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      assets: paths.assets,
      components: paths.components,
      constants: paths.constants,
      containers: paths.containers,
      hocs: paths.hocs,
      hooks: paths.hooks,
      reducers: paths.reducers,
      routes: paths.routes,
      sagas: paths.sagas,
      screens: paths.screens,
      selectors: paths.selectors,
      utils: paths.utils,
      bootstrap: paths.bootstrap,
      webseller: paths.webseller,
      config: paths.config
    }
  }
}
