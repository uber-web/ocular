const webpack = require('webpack');

const config = require('./config');

module.exports = Object.assign(config, {

  entry: [
    'react-hot-loader/patch',
  ].concat(config.entry),

  devServer: {
    hot: true,
    port: 3000,
    contentBase: './template/static',
  },

  devtool: 'cheap-source-maps',

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),

});
