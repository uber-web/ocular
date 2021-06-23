/** @typedef {import('./get-babel-config')} types */

// The following targets are designed to support the most commonly used evergreen browsers.
// As of Feb 2021 they all support async function, async iterator, and spread operator.
const ES5_TARGETS = ['>0.2%', 'maintained node versions', 'not ie 11', 'not dead', 'not chrome 49'];
const ESM_TARGETS = ['>0.2% and supports async-functions', 'maintained node versions', 'not dead'];

const DEFAULT_CONFIG = {
  comments: false
};

const COMMON_PRESETS = [
  // Accepts typescript syntax
  // Note that this still has limits (requires typescript isolated modules)
  '@babel/preset-typescript'
];

const COMMON_PLUGINS = [
  // webpack 4 cannot parse the most recent JS syntax
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  // typescript syntax supports the class properties proposal,
  // but we also need to let babel know how to transpile these
  '@babel/plugin-proposal-class-properties'
];

const ENV_CONFIG = {
  // fully transpiled build
  es5: {
    presets: [
      ...COMMON_PRESETS,
      [
        '@babel/env',
        {
          targets: ES5_TARGETS,
          modules: 'commonjs'
        }
      ]
    ],
    plugins: [...COMMON_PLUGINS, '@babel/transform-runtime']
  },
  // es module style build
  esm: {
    presets: [
      ...COMMON_PRESETS,
      [
        '@babel/env',
        {
          targets: ESM_TARGETS,
          modules: false
        }
      ]
    ],
    plugins: [
      ...COMMON_PLUGINS,
      // TODO - we likely do not need runtime transforms for the esm setting
      ['@babel/transform-runtime', {useESModules: true}]
    ]
  },
  // coverage build (node only)
  test: {
    presets: [
      ...COMMON_PRESETS,
      [
        '@babel/preset-env',
        {
          targets: 'maintained node versions'
        }
      ]
    ],
    plugins: [...COMMON_PLUGINS, 'istanbul']
  }
};

// Ensure we have an entry for the default BABEL_ENV
ENV_CONFIG.development = ENV_CONFIG.es5;

/** @type {types['getBabelConfig']} */
module.exports.getBabelConfig = function getBabelConfig(api, options = {}) {
  api.cache.using(() => process.env.BABEL_ENV);
  const config = {...DEFAULT_CONFIG, ...ENV_CONFIG[api.env()]};
  config.presets = config.presets || [];
  if (options.react) {
    config.presets.push('@babel/preset-react');
  }
  return config;
};
