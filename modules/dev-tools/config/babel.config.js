const TARGETS = {
  chrome: '60',
  edge: '15',
  firefox: '53',
  ios: '10.3',
  safari: '10.1',
  node: '8'
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
