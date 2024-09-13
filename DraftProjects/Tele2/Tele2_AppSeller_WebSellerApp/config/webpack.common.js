const path = require('path');

module.exports = {
  entry: {
    salesOffice: path.resolve(__dirname, '../src/exposes/SalesOffice')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    enforceExtension: false,
    alias: {
      features: path.resolve(__dirname, '../src/features'),
      api: path.resolve(__dirname, '../src/api'),
      common: path.resolve(__dirname, '../src/common'),
      injectStore: path.resolve(__dirname, '../src/injectStore'),
      uiKit: path.resolve(__dirname, '../src/uiKit'),
      helpers: path.resolve(__dirname, '../src/helpers'),
      icons: path.resolve(__dirname, '../src/uiKit/icons'),
      styles: path.resolve(__dirname, '../src/styles'),
    }
  }
};
