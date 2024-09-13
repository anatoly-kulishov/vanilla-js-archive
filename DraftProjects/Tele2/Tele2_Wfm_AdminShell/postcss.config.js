/* eslint-disable global-require */
// @ts-nocheck
const path = require('path');

module.exports = {
  plugins: [
    require('postcss-mixins')({
      mixinsDir: path.join(__dirname, 'src/assets/styles/mixin'),
    }),
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-custom-properties')(),
    require('postcss-import')(),
    require('postcss-inline-svg')(),
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('postcss-sort-media-queries')({
      sort: 'mobile-first',
    }),
  ],
};
