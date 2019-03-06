const config = require('./ocular.config');

const TARGETS = {
  chrome: '60',
  edge: '15',
  firefox: '53',
  ios: '10.3',
  safari: '10.1',
  node: '8'
};

function mergeEnvSettings(env, defaultSettings) {
  const envConfig = config.babel[env] || {};
  const presets = envConfig.presets || config.presets || [];
  const plugins = envConfig.plugins || config.plugins || [];

  return Object.assign({}, defaultSettings, {
    presets: defaultSettings.presets.concat(presets),
    plugins: defaultSettings.plugins.concat(plugins)
  });
}

module.exports = {
  comments: false,
  env: {
    es5: mergeEnvSettings('es5', {
      presets: [
        [ '@babel/env', {
          forceAllTransforms: true,
          modules: 'commonjs'
        }]
      ],
      plugins: [
        '@babel/transform-runtime'
      ]
    }),
    esm: mergeEnvSettings('esm', {
      presets: [
        [ '@babel/env', {
          forceAllTransforms: true,
          modules: false
        }]
      ],
      plugins: [
        ['@babel/transform-runtime', {useESModules: true}]
      ]
    }),
    es6: mergeEnvSettings('es6', {
      presets: [
        [ '@babel/env', {
          targets: TARGETS,
          modules: false
        }]
      ],
      plugins: [
        ['@babel/transform-runtime', {useESModules: true}],
        'version-inline'
      ]
    }),
    test: mergeEnvSettings('test', {
      presets: [],
      plugins: [
        'istanbul'
      ]
    })
  }
};
