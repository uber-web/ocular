const TARGETS = {
  chrome: '60',
  edge: '15',
  firefox: '53',
  ios: '10.3',
  safari: '10.1',
  node: '8'
};

function mergeEnvSettings(env, defaultSettings, userSettings) {
  const envConfig = userSettings[env] || {};
  const presets = envConfig.presets || userSettings.presets || [];
  const plugins = envConfig.plugins || userSettings.plugins || [];

  return Object.assign({}, defaultSettings, {
    presets: defaultSettings.presets.concat(presets),
    plugins: defaultSettings.plugins.concat(plugins)
  });
}

const DEFAULT_CONFIG = {
  comments: false,
  env: {
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
  }
};

module.exports = (api, overrides) => {
  api.cache(true);

  if (!overrides) {
    return DEFAULT_CONFIG;
  }

  return Object.assign({}, DEFAULT_CONFIG, {
    env: {
      es5: mergeEnvSettings('es5', DEFAULT_CONFIG.env.es5, overrides),
      es6: mergeEnvSettings('es6', DEFAULT_CONFIG.env.es6, overrides),
      esm: mergeEnvSettings('esm', DEFAULT_CONFIG.env.esm, overrides),
      test: mergeEnvSettings('test', DEFAULT_CONFIG.env.test, overrides)
    }
  });
};
