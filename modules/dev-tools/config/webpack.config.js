// Copyright (c) 2019 Uber Technologies, Inc.
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

const {resolve} = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./ocular.config');
const ALIASES = require('../node/aliases')('src');

const COMMON_CONFIG = {
  mode: 'development',

  devServer: {
    stats: {
      warnings: false
    },
    quiet: true
  },

  resolve: {
    alias: ALIASES
  },

  devtool: 'inline-source-maps',

  module: {
    rules: [
      {
        // Unfortunately, webpack doesn't import library sourcemaps on its own...
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  plugins: [new HtmlWebpackPlugin()]
};

// Replace the entry point for webpack-dev-server

module.exports = (env = {}) => {
  switch (env.mode) {
  case 'bench':
    return Object.assign({}, config, {
      entry: {
        bench: resolve(config.entry['bench-browser'])
      }
    });

  case 'test':
    return Object.assign({}, COMMON_CONFIG, {
      entry: {
        test: resolve(config.entry['test-browser'])
      }
    });

  case 'analyze':
    return Object.assign({}, COMMON_CONFIG, {
      mode: 'production',

      entry: {
        size: resolve(config.entry['bundle-size'])
      },

      devtool: false,

      plugins: [new BundleAnalyzerPlugin()]
    });
    break;

  default:
    throw new Error `Unknown bundle mode ${env.mode}`;
  }

};

