// Copyright (c) 2017 Uber Technologies, Inc.
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

// const webpack = require('webpack');

const COMMON_CONFIG = {
  mode: 'development',

  stats: {
    warnings: false
  },

  module: {
    rules: []
  },

  plugins: [],

  node: {
    fs: 'empty'
  }
};

const TEST_CONFIG = Object.assign({}, COMMON_CONFIG, {
  // Bundle the tests for running in the browser
  entry: {
    'test-browser': resolve('./test/browser.js')
  },

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: 'bundle.js'
  },

  devtool: '#source-maps',

  // devServer: {
  //   stats: {
  //     warnings: false
  //   },
  //   quiet: true
  // },

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

  resolve: {
    alias: {}
  }
});

// Replace the entry point for webpack-dev-server

function getFirstKey(object) {
  for (const key in object) {
    return key;
  }
  return null;
}

function getDist(env) {
  if ('es6' in env) {
    return 'dist/es6';
  }
  if ('esm' in env) {
    return 'dist/esm';
  }
  if ('es5' in env) {
    return 'dist/es5';
  }
  return 'src';
}

module.exports = (env, {getAliases = () => {}, rootDir}) => {
  env = env || {};

  let config = COMMON_CONFIG;
  const key = getFirstKey(env);
  switch (key) {
  case 'bench':
    config = TEST_CONFIG;
    config = Object.assign({}, config, {
      entry: {
        'test-browser': resolve('./test/bench/browser.js')
      }
    });
    break;

  case 'benchBrowser':
    config = TEST_CONFIG;
    config = Object.assign({}, config, {
      entry: {
        'test-browser': resolve('./test/bench/browser.js')
      },
      plugins: [new HtmlWebpackPlugin()]
    });
    break;

  case 'testBrowser':
  case 'browser':
  case 'test':
    config = TEST_CONFIG;
    config = Object.assign({}, config, {
      plugins: [new HtmlWebpackPlugin()]
    });
    break;

  case 'analyze':
    config = TEST_CONFIG;
    config = Object.assign(config, {
      mode: 'production',

      // Replace the entry point for webpack-dev-server
      entry: {
        'test-browser': resolve(rootDir, './size', `${key}.js`)
      },
      plugins: [new BundleAnalyzerPlugin()]
    });
    delete config.devtool;
    break;

  default:
    config = TEST_CONFIG;
    config = Object.assign({}, config, {
      mode: 'production',

      // Replace the entry point for webpack-dev-server
      entry: {
        'test-browser': resolve(rootDir, './test/size', `${key}.js`)
      }
    });
    delete config.devtool;
  }

  // Add any non-overridden aliases
  const dist = getDist(env);
  console.log('webpack dist', JSON.stringify(dist));
  config.resolve.alias = Object.assign({}, getAliases(dist), config.resolve.alias);
  // console.log('webpack env', JSON.stringify(env));
  // console.log('webpack config', JSON.stringify(config, null, 2));

  return config;
};

