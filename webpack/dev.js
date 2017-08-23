const webpack = require('webpack');

const config = require('./config');

module.exports = Object.assign(config, {

  devtool: 'inline-source-maps',

  entry: [
    'react-hot-loader/patch',
  ].concat(config.entry),

  module: Object.assign(config.module, {
    rules: config.module.rules.concat([{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {sourceMap: true},
      }, {
        loader: 'sass-loader',
        options: {sourceMap: true},
      }, {
        loader: 'autoprefixer-loader',
      }],
    }]),
  }),

  devServer: {
    hot: true,
    port: 3000,
    contentBase: './template/static',
  },

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),

});
