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
      // babel-eslint can process TS files, but it doesn't understand types
      // typescript-eslint has some more advanced rules with type checking
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      env: {browser: true, es6: true, node: true},
      parserOptions: {
        sourceType: 'module',   // we want to use ES modules
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
