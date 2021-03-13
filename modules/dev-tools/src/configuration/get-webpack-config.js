/** @typedef {import('./get-ocular-config')} types */

const {resolve} = require('path');
const BundleAnalyzerPlugin = null; // require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getOcularConfig = require('./get-ocular-config');

const COMMON_CONFIG = {
  mode: 'development',

  devServer: {
    stats: {
      warnings: false
    }
  },

  resolve: {
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
    fs: 'empty',
    net: 'empty',
    child_process: 'empty'
  },

  plugins: [new HtmlWebpackPlugin()]
};

const MAIN_FIELDS = {
  es6: ['esnext', 'browser', 'module', 'main'],
  esm: ['module', 'main'],
  es5: ['main']
};

/** @type {types['getWebpackConfig']} */
module.exports = function getWebpackConfig(env = {}, opts = {}) {
  const config = getOcularConfig(opts);

  COMMON_CONFIG.resolve.alias = config.aliases;

  switch (env.mode) {

  case 'size':
    return Object.assign({}, COMMON_CONFIG, {
      mode: 'production',

      entry: getEntryPoints('size', config),

      resolve: Object.assign({}, COMMON_CONFIG.resolve, {
        mainFields: MAIN_FIELDS[env.dist] || MAIN_FIELDS.esm
      }),

      devtool: false,

      plugins: []
    });

  case 'analyze':
  case 'analyze-dev':
    return Object.assign({}, COMMON_CONFIG, {
      mode: 'development',

      entry: getEntryPoints('size', config),

      devtool: false,

      plugins: [new BundleAnalyzerPlugin()]
    });
    break;
  
  case 'analyze-prod':
    return Object.assign({}, COMMON_CONFIG, {
      mode: 'production',

      entry: getEntryPoints('size', config),

      devtool: false,

      plugins: [new BundleAnalyzerPlugin()]
    });
    break;

  case 'bench':
  case 'test':
  default:
    return Object.assign({}, COMMON_CONFIG, {
      entry: getEntryPoints(`${env.mode}-browser`, config)
    });
  }
};

// HELPERS

function getEntryPoints(key, config) {
  let entry = config.entry[key] || {};
  if (typeof entry === 'string') {
    entry = {[key]: entry};
  }
  for (const key in entry) {
    entry[key] = resolve(entry[key]);
  }
  return entry;
}
