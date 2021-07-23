const typescriptConfigs = require('@typescript-eslint/eslint-plugin').configs;

const DEFAULT_OPTIONS = {
  react: false
};

const DEFAULT_CONFIG = {
  extends: ['airbnb', 'prettier', 'plugin:import/errors'],
  plugins: ['import'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    // @babel/eslint-parser issues https://github.com/babel/babel/issues/11975
    requireConfigFile: false,
    babelOptions: {
      configFile: './babel.config.js'
    }
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
    'guard-for-in': 'off',
    'generator-star-spacing': 'off',
    'func-names': 'off',
    'no-case-declarations': 'warn',
    'no-inline-comments': 'off',
    'no-multi-str': 'off',
    'no-restricted-syntax': 'off', // Allow for...in
    'no-param-reassign': 'warn',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': ['warn', {vars: 'all', args: 'none', ignoreRestSiblings: false}],
    'space-before-function-paren': 'off',
    'accessor-pairs': ['error', {getWithoutSet: false, setWithoutGet: false}],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': ['error'],
    'import/no-extraneous-dependencies': ['error', {devDependencies: false, peerDependencies: true}]
  },
  settings: {
    // Ensure eslint finds typescript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts']
      }
    }
  },
  ignorePatterns: ['node_modules', '**/dist*/**/*.js'],
  overrides: [
    {
      // babel-eslint can process TS files, but it doesn't understand types
      // typescript-eslint has some more advanced rules with type checking
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module', // we want to use ES modules
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        // typescript rules
        ...typescriptConfigs['eslint-recommended'].rules,
        ...typescriptConfigs.recommended.rules,
        ...typescriptConfigs['recommended-requiring-type-checking'].rules,

        // Standard rules

        // We still have some issues with import resolution
        'import/named': 0,
        'import/no-extraneous-dependencies': ['warn'],
        // Warn instead of error
        'max-params': ['warn'],
        'no-undef': ['warn'],
        camelcase: ['warn'],
        indent: ['warn', 2, {SwitchCase: 1}],
        quotes: ['warn', 'single'],
        'no-process-env': 'off',

        // Some of JS rules don't always work correctly in TS and
        // hence need to be reimported as TS rules
        'no-redeclare': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',
        'no-dupe-class-members': 'off',

        // TODO - These rules are sometimes not found?
        // '@typescript-eslint/no-shadow': ['warn'],
        // '@typescript-eslint/no-redeclare': ['warn'],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {vars: 'all', args: 'none', ignoreRestSiblings: false}
        ],

        // We use function hoisting to put exports at top of file
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error'],

        // some day we will hopefully be able to enable this rule
        '@typescript-eslint/no-explicit-any': 'off',

        // We encourage explicit typing, e.g `field: string = ''`
        '@typescript-eslint/no-inferrable-types': 'off',

        '@typescript-eslint/no-empty-interface': ['warn'],
        '@typescript-eslint/restrict-template-expressions': ['warn'],
        '@typescript-eslint/explicit-module-boundary-types': ['warn'],
        '@typescript-eslint/require-await': ['warn'],
        '@typescript-eslint/no-unsafe-return': ['warn'],
        '@typescript-eslint/no-unsafe-call': ['warn'],

        '@typescript-eslint/ban-ts-comment': ['warn'],
        '@typescript-eslint/ban-types': ['warn'],
        '@typescript-eslint/no-unsafe-member-access': ['warn'],
        '@typescript-eslint/no-unsafe-assignment': ['warn'],
        '@typescript-eslint/no-var-requires': ['warn'],
        '@typescript-eslint/switch-exhaustiveness-check': ['error'],
        '@typescript-eslint/no-floating-promises': ['warn'],
        '@typescript-eslint/await-thenable': ['warn'],
        '@typescript-eslint/no-misused-promises': ['warn'],
        '@typescript-eslint/restrict-plus-operands': ['warn'],
        '@typescript-eslint/no-empty-function': ['warn']
      }
    },
    {
      // We can lint through code examples in Markdown as well,
      // but we don't need to enable all of the rules there
      files: ['**/*.md'],
      plugins: ['markdown'],
      // extends: 'plugin:markdown/recommended',
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
    extends: [
      ...DEFAULT_CONFIG.extends,
      'plugin:react/recommended'
      // 'plugin:react-hooks/recommended',
      // 'prettier/react'
    ],
    plugins: [...DEFAULT_CONFIG.plugins, 'react', 'react-hooks'],
    settings: {
      react: {
        version: options.react
      }
    }
  };
}

module.exports.getESLintConfig = function getESLintConfig(options) {
  const mergedOptions = {...DEFAULT_OPTIONS, ...options};
  let config = DEFAULT_CONFIG;
  if (mergedOptions.react) {
    // @ts-expect-error
    config = {...config, ...getReactConfig(mergedOptions)};
  }

  // console.error(config);
  return config;
};
