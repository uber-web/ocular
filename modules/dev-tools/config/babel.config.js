// The following targets are designed to support the most commonly used evergreen browsers.
// As of Feb 2021 they all support async function, async iterator, and spread operator.
const ES5_TARGETS = ['>0.2%', 'maintained node versions', 'not ie 11', 'not dead', 'not chrome 49'];
const ESM_TARGETS = ['>0.2% and supports async-functions', 'maintained node versions', 'not dead'];

const COMMON_CONFIG = {
  comments: false
};

const ENV_CONFIG = {
  es5: {
    presets: [
      [ '@babel/env', {
        targets: ES5_TARGETS,
        modules: 'commonjs'
      }]
    ],
    plugins: [
      '@babel/transform-runtime'
    ]
  },
  esm: {
    presets: [
      [ '@babel/env', {
        targets: ESM_TARGETS,
        modules: false
      }]
    ],
    plugins: [
      ['@babel/transform-runtime', {useESModules: true}]
    ]
  },
  test: {
    presets: [
      [ '@babel/preset-env', {
        targets: 'maintained node versions'
      }]
    ],
    plugins: [
      'istanbul'
    ]
  }
};

// Ensure we have an entry for the default BABEL_ENV
ENV_CONFIG.development = ENV_CONFIG.es5;

module.exports = (api) => {
  api.cache.using(() => process.env.BABEL_ENV);

  return Object.assign({}, COMMON_CONFIG, ENV_CONFIG[api.env()]);
};
