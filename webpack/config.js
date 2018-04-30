// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const webpack = require('webpack');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

const dirPath = process.env.DIR_PATH;

const htmlConfig = require(`${dirPath}/html.config`);

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

  module: {
    noParse: /(mapbox-gl)\.js$/,

    rules: [{
      test: /\.md$/,
      use: 'raw-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules\/(?!(ocular)\/).*/,
      options: BABEL_CONFIG,
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|gif|jpe?g|png)$/,
      loader: 'url-loader?limit=100000',
    }],
  },

  resolve: {
    modules: [
      `${dirPath}/src`,
      `${dirPath}/node_modules`,
      resolve(__dirname, '../base'),
      resolve(__dirname, '../node_modules'),
    ],
  },

  plugins: [

    new HtmlWebpackPlugin(Object.assign({

      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      mobile: true,

      links: [{
        rel: 'icon',
        type: 'img/ico',
        href: 'favicon.ico',
      }],

    }, htmlConfig)),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        MapboxAccessToken: JSON.stringify(
          process.env.MapboxAccessToken || process.env.MAPBOX_TOKEN
        ),
      },
    }),

  ],

  node: {
    fs: 'empty',
  },

};
