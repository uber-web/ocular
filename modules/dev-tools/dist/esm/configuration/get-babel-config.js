import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TARGETS = ['>0.2%', 'maintained node versions', 'not ie 11', 'not dead', 'not chrome 49'];
var DEFAULT_CONFIG = {
  comments: false
};
var ENV_CONFIG = {
  es5: {
    presets: [['@babel/env', {
      targets: TARGETS,
      modules: 'commonjs'
    }]],
    plugins: ['@babel/transform-runtime']
  },
  esm: {
    presets: [['@babel/env', {
      targets: TARGETS,
      modules: false
    }]],
    plugins: [['@babel/transform-runtime', {
      useESModules: true
    }]]
  },
  test: {
    presets: [['@babel/preset-env', {
      targets: 'maintained node versions'
    }]],
    plugins: ['istanbul']
  }
};
ENV_CONFIG.development = ENV_CONFIG.es5;

module.exports.getBabelConfig = function getBabelConfig(api) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  api.cache.using(function () {
    return process.env.BABEL_ENV;
  });

  var config = _objectSpread(_objectSpread({}, DEFAULT_CONFIG), ENV_CONFIG[api.env()]);

  config.presets = config.presets || [];

  if (options.react) {
    config.presets.push('@babel/preset-react');
  }

  config.presets.push('@babel/preset-typescript');
  return config;
};
//# sourceMappingURL=get-babel-config.js.map