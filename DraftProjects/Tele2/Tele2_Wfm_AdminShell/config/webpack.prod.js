const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');
const paths = require('./paths');

// Ответвления от common конфигурации, нужны исключительно для продуктивной сборки
module.exports = (env) => merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP': JSON.stringify(env.app),
    }),
  ],
  devtool: false,
  output: {
    path: paths.appBuild,
    publicPath: '/',
    chunkFilename: '[id].[name].[contenthash:8].chunk.js',
    filename: '[id].[name].[contenthash:8].bundle.js',
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          sourceMap: false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
});
