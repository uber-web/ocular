const typescriptConfigs = require('@typescript-eslint/eslint-plugin').configs;

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: ['markdown'],
  extends: [
    'uber-es2015',
    'prettier'
  ],
  rules: {
    'guard-for-in': 0,
    'no-inline-comments': 0,
    'camelcase': 0
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      env: {browser: true, es6: true, node: true},
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint'],
      rules: {
        ...typescriptConfigs['eslint-recommended'].rules,
        ...typescriptConfigs.recommended.rules,
        ...typescriptConfigs['recommended-requiring-type-checking'].rules,
        indent: ['warn', 2, {SwitchCase: 1}],
        quotes: ['warn', 'single'],
        'no-redeclare': 'off',
        'no-process-env': 'off',
        '@typescript-eslint/no-redeclare': ['warn'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['warn'],
        '@typescript-eslint/no-explicit-any': 0,
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': ['error'],
        '@typescript-eslint/switch-exhaustiveness-check': ['error']
      }
    },
    {
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
