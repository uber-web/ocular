"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var typescriptConfigs = require('@typescript-eslint/eslint-plugin').configs;

var DEFAULT_OPTIONS = {
  react: false
};
var DEFAULT_CONFIG = {
  extends: ['uber-es2015', 'prettier', 'prettier/react', 'plugin:import/errors'],
  plugins: ['import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    es2020: true
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
    'accessor-pairs': ['error', {
      getWithoutSet: false,
      setWithoutGet: false
    }],
    'import/no-unresolved': ['error'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: false,
      peerDependencies: true
    }]
  },
  ignorePatterns: ['node_modules', '**/dist*/**/*.js'],
  overrides: [{
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      project: './tsconfig.json'
    },
    plugins: ['@typescript-eslint'],
    rules: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, typescriptConfigs['eslint-recommended'].rules), typescriptConfigs.recommended.rules), typescriptConfigs['recommended-requiring-type-checking'].rules), {}, {
      indent: ['warn', 2, {
        SwitchCase: 1
      }],
      quotes: ['warn', 'single'],
      'no-process-env': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/switch-exhaustiveness-check': ['error'],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['warn'],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['warn'],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': ['error']
    })
  }, {
    files: ['**/*.md'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      'no-console': 'off',
      'padded-blocks': 'off'
    }
  }]
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

module.exports.getESLintConfig = function getESLintConfig(options) {
  options = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
  var config = DEFAULT_CONFIG;

  if (options.react) {
    config = _objectSpread(_objectSpread({}, config), getReactConfig(options));
  }

  return config;
};
//# sourceMappingURL=get-eslint-config.js.map