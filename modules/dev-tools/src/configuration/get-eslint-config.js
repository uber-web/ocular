const DEFAULT_OPTIONS = {
  react: false
};

const DEFAULT_CONFIG = {
  extends: ['uber-es2015', 'prettier', 'prettier/react', 'plugin:import/errors'],
  plugins: ['import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021
  },
  env: {
    // Note: also sets ecmaVersion
    es2021: true
  },
  globals: {
    globalThis: 'readonly',
    __VERSION__: 'readonly'
  },
  rules: {
    'guard-for-in': 0,
    'generator-star-spacing': 0,
    'func-names': 0,
    'no-inline-comments': 0,
    'no-multi-str': 0,
    'space-before-function-paren': 0,
    'accessor-pairs': ['error', {getWithoutSet: false, setWithoutGet: false}],
    'import/no-unresolved': ['error'],
    'import/no-extraneous-dependencies': ['error', {devDependencies: false, peerDependencies: true}]
  },
  ignorePatterns: ['node_modules', '**/dist*/**/*.js']
};

function getReactConfig(options) {
  return {
    extends: ['uber-es2015', 'uber-jsx', 'prettier', 'prettier/react', 'plugin:import/errors'],
    plugins: ['import', 'react'],
    settings: {
      react: {
        version: options.react
      }
    }
  };
}

module.exports = function getESLintConfig(options) {
  options = {...DEFAULT_OPTIONS, ...options};
  let config = DEFAULT_CONFIG;
  if (options.react) {
    config = {...config, ...getReactConfig(options)};
  }

  // console.error(config);
  return config;
};
