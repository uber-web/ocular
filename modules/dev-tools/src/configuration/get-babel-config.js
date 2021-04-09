/** @typedef {import('./get-babel-config')} types */

// The following targets are designed to support the most commonly used evergreen browsers.
// As of Feb 2021 they all support async function, async iterator, and spread operator.
const TARGETS = ['>0.2%', 'maintained node versions', 'not ie 11', 'not dead', 'not chrome 49'];

const DEFAULT_CONFIG = {
  comments: false
};

const ENV_CONFIG = {
  es5: {
    presets: [
      [
        '@babel/env',
        {
          targets: TARGETS,
          modules: 'commonjs'
        }
      ]
    ],
    plugins: ['@babel/transform-runtime']
  },
  esm: {
    presets: [
      [
        '@babel/env',
        {
          targets: TARGETS,
          modules: false
        }
      ]
    ],
    plugins: [['@babel/transform-runtime', {useESModules: true}]]
  },
  test: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: 'maintained node versions'
        }
      ]
    ],
    plugins: ['istanbul']
  }
};

// Ensure we have an entry for the default BABEL_ENV
ENV_CONFIG.development = ENV_CONFIG.es5;

/** @type {types['getBabelConfig']} */
module.exports = function getBabelConfig(api, options = {}) {
  api.cache.using(() => process.env.BABEL_ENV);
  const config = {...DEFAULT_CONFIG, ...ENV_CONFIG[api.env()]};
  config.presets = config.presets || [];
  if (options.react) {
    config.presets.push('@babel/preset-react');
  }
  // TODO add flag?
  config.presets.push('@babel/preset-typescript');
  return config;
};
