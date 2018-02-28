const webpack = require('webpack');
const merge = require('deepmerge');

const config = require('./config');
const getCustomConfig = require('./custom');

const dirPath = process.env.DIR_PATH;
const mergeOpts = {arrayMerge: (a, b) => a.concat(b)};

const out = merge(merge(config, getCustomConfig(dirPath), mergeOpts), {

  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    'whatwg-fetch',
    './base/main'
  ],

  devtool: 'inline-source-maps',

  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {sourceMap: true},
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [
            `${dirPath}/src/styles`,
          ],
        },
      }, {
        loader: 'autoprefixer-loader',
      }],
    }],
  },

  devServer: {
    hot: true,
    contentBase: ['./static', `${dirPath}/static`],
    historyApiFallback: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

}, mergeOpts);

if (process.env.DEBUGGING === 'true') {
  console.log(JSON.stringify(out, null, 2)); // eslint-disable-line
}

module.exports = out;
