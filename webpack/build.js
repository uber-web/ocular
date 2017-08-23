const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = require('./config');

const dirPath = process.env.DIR_PATH;

module.exports = Object.assign(config, {

  output: {
    path: `${dirPath}/dist`,
    filename: 'bundle-[hash].js'
  },

  module: Object.assign(config.module, {
    rules: config.module.rules.concat([{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader!autoprefixer-loader',
      }),
    }]),
  }),

  plugins: [

    new ExtractTextPlugin('styles-[hash].css'),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),

    new ProgressBarPlugin(),

  ].concat(config.plugins),

});
