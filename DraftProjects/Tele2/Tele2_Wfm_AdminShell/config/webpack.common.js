const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');
// TODO: Module federation
const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

const ESLintPlugin = require('eslint-webpack-plugin');

const paths = require('./paths');
const envFactory = require('./setEnv');

const packageJsonDeps = require('../package.json').dependencies;

// TODO temporary для process.env.APPSELLER_SERVICES_URL
require('dotenv').config({
  path: paths.dotenvLocal,
})
const isDevelopment = process.env.NODE_ENV === 'development'
//

const appPrefix = 'admin-shell-app';

// Общий конфиг Webpack
// Тут обозначены общие для продуктива и девелопа плагины и загрузчики
module.exports = {
  entry: paths.appEntry,
  plugins: [
    new ESLintPlugin(),
    // Очищает папку с билдом
    new CleanWebpackPlugin(),
    // Минифицирование всех CSS
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
    // HotModuleReplacementPlugin необходим
    // для автоматической загрузки изменных модулей во время разработки
    // работает только при NODE_ENV === 'development'
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_PREFIX': JSON.stringify(appPrefix),
      // TODO падают билды, при редактировании prod конфига (read only), поэтому пока здесь, потом нужно развести по конфигам (dev/prod), 
      'process.env.APPSELLER_SERVICES_URL': isDevelopment ? JSON.stringify(process.env.APPSELLER_SERVICES_URL) : JSON.stringify('ENV_APPSELLER_SERVICES_URL'),
    }),
    new ModuleFederationPlugin({
      name: 'tele2_wfm_adminshellapp',
      remotes: {
        tele2_wfm_uilibraryapp: "tele2_wfm_uilibraryapp@[tele2_wfm_uilibraryappUrl]/remoteEntry.js",
      },
      shared: {
        "react": { singleton: true, requiredVersion: packageJsonDeps["react"] },
        "react-dom": { singleton: true, requiredVersion: packageJsonDeps["react-dom"] },
        "react-router-dom": { singleton: true, requiredVersion: packageJsonDeps["react-router-dom"] },
        "axios": { singleton: true, requiredVersion: packageJsonDeps["axios"] },
        "oidc-react": { singleton: true, requiredVersion: packageJsonDeps["oidc-react"] },
        "antd": { singleton: true, requiredVersion: packageJsonDeps["antd"] },
        "react-query": { singleton: true, requiredVersion: packageJsonDeps["react-query"] },
        '@t2crm/wfm-shell-context': {
          import: '@t2crm/wfm-shell-context',
          requiredVersion: packageJsonDeps["@t2crm/wfm-shell-context"],
        },
        "@t2crm/wfm-utils": {
          import: "@t2crm/wfm-utils",
          requiredVersion: packageJsonDeps["@t2crm/wfm-utils"],
        },
      },
    }),
    // HtmlWebpackPlugin необходим для автоматического импорта скриптов index.html
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appPublic}/favicon.ico`,
    }),
    new ExternalTemplateRemotesPlugin(),
    new RetryChunkLoadPlugin({
      maxRetries: 3,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: paths.appSrc,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: paths.appTsConfig
        }
      },
      {
        // Загрузка всех скриптов
        test: /\.(js|mjs|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        // Загрузка остальных файлов
        oneOf: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
          },
          {
            test: /\.svg$/,
            enforce: 'pre',
            use: ['@svgr/webpack'],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                    globalVars: {
                      'app-prefix': appPrefix,
                    }
                  },
                }
              }
            ],
          },
          {
            exclude: [/\.(js|mjs|jsx|tsx|ts)$/, /\.html$/, /\.json$/],
            type: "asset/resource",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      assets: paths.assets,
      components: paths.components,
      constants: paths.constants,
      containers: paths.containers,
      context: paths.context,
      enums: paths.enums,
      hocs: paths.hocs,
      hooks: paths.hooks,
      reducers: paths.reducers,
      sagas: paths.sagas,
      pages: paths.pages,
      selectors: paths.selectors,
      utils: paths.utils,
      types: paths.types,
    },
  },
};
