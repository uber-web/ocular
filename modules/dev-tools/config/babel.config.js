// The following targets are designed to support the most commonly used evergreen browsers.
// As of Feb 2021 they all support async function, async iterator, and spread operator.
const TARGETS = [
  ">0.2%",
  "not ie 11",
  "not dead",
  "not chrome 49"
];

const COMMON_CONFIG = {
  comments: false
};

const ENV_CONFIG = {
  es5: {
    presets: [
      [ '@babel/env', {
        targets: TARGETS,
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
        targets: TARGETS,
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
        targets: {node: '14'}
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
