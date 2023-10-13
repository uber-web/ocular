/** @typedef {import('./get-babel-config')} types */
const deepMerge = require('deepmerge');
const {inspect} = require('util');

// The following targets are designed to support the most commonly used evergreen browsers.
// As of Feb 2021 they all support async function, async iterator, and spread operator.
const ES5_TARGETS = ['>0.2%', 'maintained node versions', 'not ie 11', 'not dead', 'not chrome 49'];
const ESM_TARGETS = ['>0.2% and supports async-functions', 'maintained node versions', 'not dead'];
// Reduce verbosity
const ESM_PLUGIN_BLACKLIST = [
  // Template literals are supported in all latest versions of environments
  '@babel/plugin-transform-template-literals'
];

const DEFAULT_CONFIG = {
  comments: false,
  // These settings reduce the verbosity of transpile outputs
  assumptions: {
    // When declaring classes, assume that methods don't shadow getters on the superclass and that the program doesn't depend on methods being non-enumerable.
    setClassMethods: true,
    // When using public class fields, assume that they don't shadow any getter in the current class, in its subclasses or in its superclass.
    setPublicClassFields: true
  }
};

const COMMON_PRESETS = [
  // Accepts typescript syntax
  // Note that this still has limits (requires typescript isolated modules)
  '@babel/preset-typescript'
];

const COMMON_PLUGINS = [];

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
          exclude: ESM_PLUGIN_BLACKLIST,
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

  'esm-strict': {
    presets: [
      ...COMMON_PRESETS,
      [
        '@babel/env',
        {
          targets: ESM_TARGETS,
          exclude: ESM_PLUGIN_BLACKLIST,
          modules: false
        }
      ]
    ],
    plugins: [
      ...COMMON_PLUGINS,
      "babel-plugin-add-import-extension",
      // TODO - we likely do not need runtime transforms for the esm setting
      ['@babel/transform-runtime', {useESModules: true}]
    ]
  },

  bundle: {
    presets: [
      ...COMMON_PRESETS,
      [
        '@babel/env',
        {
          targets: ESM_TARGETS,
          modules: false
        }
      ]
    ]
  },

  'bundle-dev': {
    presets: [...COMMON_PRESETS]
  }
};

// Ensure we have an entry for the default BABEL_ENV
ENV_CONFIG.development = ENV_CONFIG.es5;

/** @type {types['getBabelConfig']} */
module.exports.getBabelConfig = function getBabelConfig(options = {}) {
  return (api) => {
    if (api.cache) {
      api.cache.using(() => process.env.BABEL_ENV);
    }

    let config = {
      ...DEFAULT_CONFIG,
      ...ENV_CONFIG[api.env()]
    };
    if (options.react) {
      config = deepMerge(config, {
        presets: ['@babel/preset-react']
      })
    }
    if (options.overrides) {
      config = deepMerge(config, options.overrides);
    }

    if (options.debug) {
      console.log(inspect(config, {colors: true, depth: null}));
    }

    return config;
  };
};
