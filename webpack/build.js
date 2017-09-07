const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('deepmerge');

const getCustomConfig = require('./custom');
const config = require('./config');

const dirPath = process.env.DIR_PATH;
const mergeOpts = {arrayMerge: (a, b) => a.concat(b)};

const out = merge(merge(config, getCustomConfig(dirPath), mergeOpts), {

  output: {
    path: `${dirPath}/dist`,
    filename: 'bundle-[hash].js'
  },

  module: {
    rules: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              `${dirPath}/src/styles`,
            ],
          },
        }, {
          loader: 'autoprefixer-loader',
        }],
      }),
    }],
  },

  plugins: [

    new ExtractTextPlugin('styles-[hash].css'),

    new CopyWebpackPlugin([{
      from: './static'
    }, {
      from: `${dirPath}/static`,
    }]),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.optimize.UglifyJsPlugin({sourceMap: false, compressor: {warnings: false}}),

    new ProgressBarPlugin(),

    new OfflinePlugin(),

  ],

}, mergeOpts);

if (process.env.DEBUGGING === 'true') {
  console.log(JSON.stringify(out, null, 2)); // eslint-disable-line
}

module.exports = out;
