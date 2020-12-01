import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _require = require('path'),
    resolve = _require.resolve;

var BundleAnalyzerPlugin = null;

var HtmlWebpackPlugin = require('html-webpack-plugin');

var _require2 = require('../helpers/get-ocular-config'),
    getOcularConfig = _require2.getOcularConfig;

var COMMON_CONFIG = {
  mode: 'development',
  devServer: {
    stats: {
      warnings: false
    }
  },
  resolve: {},
  devtool: 'inline-source-maps',
  module: {
    rules: [{
      test: /\.js$/,
      use: ['source-map-loader'],
      enforce: 'pre'
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    child_process: 'empty'
  },
  plugins: [new HtmlWebpackPlugin()]
};
var MAIN_FIELDS = {
  es6: ['esnext', 'browser', 'module', 'main'],
  esm: ['module', 'main'],
  es5: ['main']
};

module.exports.getWebpackConfig = function getWebpackConfig() {
  var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = getOcularConfig(opts);
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

    case 'analyze-prod':
      return Object.assign({}, COMMON_CONFIG, {
        mode: 'production',
        entry: getEntryPoints('size', config),
        devtool: false,
        plugins: [new BundleAnalyzerPlugin()]
      });

    case 'bench':
    case 'test':
    default:
      return Object.assign({}, COMMON_CONFIG, {
        entry: getEntryPoints("".concat(env.mode, "-browser"), config)
      });
  }
};

function getEntryPoints(entryKey, config) {
  var entry = config.entry[entryKey] || {};

  if (typeof entry === 'string') {
    entry = _defineProperty({}, entryKey, entry);
  }

  for (var key in entry) {
    entry[key] = resolve(entry[key]);
  }

  return entry;
}
//# sourceMappingURL=get-webpack-config.js.map