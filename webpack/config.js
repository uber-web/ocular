const webpack = require('webpack');
const {resolve} = require('path');

const dirPath = process.env.DIR_PATH;

const BABEL_CONFIG = {
  presets: [
    'es2015',
    'stage-2',
    'react'
  ].map(name => require.resolve(`babel-preset-${name}`)),
  plugins: [
    'transform-decorators-legacy'
  ].map(name => require.resolve(`babel-plugin-${name}`))
};

module.exports = {

  entry: ['babel-polyfill', 'whatwg-fetch', './template/main'],

  module: {
    rules: [{
      test: /\.md$/,
      use: 'raw-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      options: BABEL_CONFIG,
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader'],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|gif|jpe?g|png)$/,
      loader: 'url-loader',
    }],
  },

  resolve: {
    modules: [
      `${dirPath}/src`,
      resolve(__dirname, '../template'),
      resolve(__dirname, '../node_modules'),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],

  node: {
    fs: 'empty',
  },

};
