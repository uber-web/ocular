/** @typedef {import('./get-webpack-config')} types */

const {resolve} = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {getOcularConfig} = require('../helpers/get-ocular-config');

/** Common fields for Webpack 4 and 5 */
const COMMON_CONFIG = {
  mode: 'development',

  resolve: {},

  devtool: 'inline-source-map',

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

  plugins: [new HtmlWebpackPlugin()]
};

/** Fields used by Webpack 4 only */
const WEBPACK4_CONFIG = {
  node: {
    fs: 'empty',
    net: 'empty',
    // eslint-disable-next-line camelcase
    child_process: 'empty'
  },
  devServer: {
    stats: {
      warnings: false
    }
  }
};

const MAIN_FIELDS = {
  es6: ['esnext', 'browser', 'module', 'main'],
  esm: ['module', 'main'],
  es5: ['main']
};

/** @type {types['getWebpackConfig']} */
module.exports.getWebpackConfig = function getWebpackConfig(env = {}, opts = {}) {
  const ocularConfig = getOcularConfig(opts);

  const webpackConfig = {...COMMON_CONFIG};
  webpackConfig.resolve.alias = ocularConfig.aliases;

  switch (env.mode) {
    case 'size':
      Object.assign(webpackConfig, {
        mode: 'production',

        entry: getEntryPoints('size', ocularConfig),

        resolve: {...COMMON_CONFIG.resolve, mainFields: MAIN_FIELDS[env.dist] || MAIN_FIELDS.esm},

        devtool: false,

        plugins: []
      });
      break;

    case 'analyze':
    case 'analyze-dev':
      Object.assign(webpackConfig, {
        mode: 'development',

        entry: getEntryPoints('size', ocularConfig),

        devtool: false,

        plugins: [new BundleAnalyzerPlugin()]
      });
      break;

    case 'analyze-prod':
      Object.assign(webpackConfig, {
        mode: 'production',

        entry: getEntryPoints('size', ocularConfig),

        devtool: false,

        plugins: [new BundleAnalyzerPlugin()]
      });
      break;

    case 'bench':
    case 'test':
    default:
      Object.assign(webpackConfig, {
        entry: getEntryPoints(`${env.mode}-browser`, ocularConfig)
      });
  }

  // webpack 4 specifics
  if (ocularConfig.webpack.version !== 5) {
    Object.assign(webpackConfig, WEBPACK4_CONFIG);
    // TODO - check if this is correct.
    webpackConfig.devtool = 'inline-source-maps';
  }

  return webpackConfig;
};

// HELPERS

function getEntryPoints(entryKey, config) {
  let entry = config.entry[entryKey] || {};
  if (typeof entry === 'string') {
    entry = {[entryKey]: entry};
  }
  for (const key in entry) {
    entry[key] = resolve(entry[key]);
  }
  return entry;
}
