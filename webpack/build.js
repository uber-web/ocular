const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');

const dirPath = process.env.DIR_PATH;

const out = Object.assign(config, {

  output: {
    path: `${dirPath}/dist`,
    filename: 'bundle-[hash].js'
  },

  module: Object.assign(config.module, {
    rules: config.module.rules.concat([{
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
    }]),
  }),

  plugins: config.plugins.concat([

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

    new webpack.optimize.UglifyJsPlugin({sourceMap: true, compressor: {warnings: false}}),

    new ProgressBarPlugin(),

    new OfflinePlugin(),

  ]),

});

if (process.env.DEBUGGING === 'true') {
  console.log(JSON.stringify(out, null, 2)); // eslint-disable-line
}

module.exports = out;
