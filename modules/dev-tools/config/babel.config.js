// The goal of the `es6` target is a very clean build (minimally transformed).
// - It is intended to enable debugging using non-transpiled code.
// - It intentionally runs on recent browsers only.
//
// In particular, it does not transform async/await constructs, which is very helpful when debugging
// Because of this, we only try to support ~1 year old browsers + Node LTS
// Including older versions dramatically increases the number of transforms preset-env will apply
// Note: uncomment `debug` flag in preset env to see what gets included
const ES6_TARGETS = {
  chrome: '79', // Released: 2019-Dec-10, https://en.wikipedia.org/wiki/Google_Chrome_version_history
  edge: '79', // Released: 2020-Jan-15, https://en.wikipedia.org/wiki/Microsoft_Edge
  firefox: '68', // Released: 2019-Jul-9, https://en.wikipedia.org/wiki/Firefox_version_history
  safari: '12', // Released: 2018-09-07 (OSX Mojave) - https://en.wikipedia.org/wiki/Safari_version_history
  ios: '12', // Track Safari
  node: '10' // Node 8 LTS expired December 31, 2019.
};

const COMMON_CONFIG = {
  comments: false
};

const ENV_CONFIG = {
  es5: {
    presets: [
      [ '@babel/env', {
        forceAllTransforms: true,
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
        forceAllTransforms: true,
        modules: false
      }]
    ],
    plugins: [
      ['@babel/transform-runtime', {useESModules: true}]
    ]
  },
  es6: {
    presets: [
      [ '@babel/env', {
        targets: ES6_TARGETS,
        // debug: true, // shows which plugins are selected by targets
        modules: false,
        exclude: [
          "@babel/plugin-transform-regenerator"
        ]
      }]
    ],
    plugins: [
      ['@babel/transform-runtime', {useESModules: true}]
    ]
  },
  test: {
    presets: [
      '@babel/preset-env'
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
