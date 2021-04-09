const typescriptConfigs = require('@typescript-eslint/eslint-plugin').configs;

const DEFAULT_OPTIONS = {
  react: false
};

const DEFAULT_CONFIG = {
  extends: ['uber-es2015', 'prettier', 'prettier/react', 'plugin:import/errors'],
  plugins: ['import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    // Note: also sets ecmaVersion
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
    'accessor-pairs': ['error', {getWithoutSet: false, setWithoutGet: false}],
    'import/no-unresolved': ['error'],
    'import/no-extraneous-dependencies': ['error', {devDependencies: false, peerDependencies: true}]
  },
  ignorePatterns: ['node_modules', '**/dist*/**/*.js'],
  overrides: [
    {
      // babel-eslint can process TS files, but it doesn't understand types
      // typescript-eslint has some more advanced rules with type checking
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module', // we want to use ES modules
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        ...typescriptConfigs['eslint-recommended'].rules,
        ...typescriptConfigs.recommended.rules,
        ...typescriptConfigs['recommended-requiring-type-checking'].rules,
        indent: ['warn', 2, {SwitchCase: 1}],
        quotes: ['warn', 'single'],
        'no-process-env': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/switch-exhaustiveness-check': ['error'],
        // Some of JS rules don't always work correctly in TS and
        // hence need to be reimported as TS rules
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['warn'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['warn'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error']
      }
    },
    {
      // We can lint through code examples in Markdown as well,
      // but we don't need to enable all of the rules there
      files: ['**/*.md'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-console': 'off',
        'padded-blocks': 'off'
      }
    }
  ]
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
