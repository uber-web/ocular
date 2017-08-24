const webpack = require('webpack');

const config = require('./config');

const dirPath = process.env.DIR_PATH;

const out = Object.assign(config, {

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
        options: {
          sourceMap: true,
          includePaths: [
            `${dirPath}/src/styles`,
          ],
        },
      }, {
        loader: 'autoprefixer-loader',
      }],
    }]),
  }),

  devServer: {
    hot: true,
    port: 3000,
    contentBase: ['./static', `${dirPath}/static`],
  },

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),

});

if (process.env.DEBUGGING === 'true') {
  console.log(JSON.stringify(out, null, 2)); // eslint-disable-line
}

module.exports = out;
