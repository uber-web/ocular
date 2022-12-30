const {getESLintConfig} = require('ocular-dev-tools/configuration');

module.exports = getESLintConfig({
  react: '16.8.2',
  overrides: {
    parserOptions: {
      project: ['./tsconfig.json'],
      babelOptions: {
        configFile: './babel.config.cjs'
      }
    },

    rules: {
      'import/no-extraneous-dependencies': 0,
      'no-console': 0,
      'no-process-env': 0,
      'no-process-exit': 0
    },

    env: {
      node: true
    },

    ignorePatterns: ['modules/gatsby-theme-ocular']
  }
});
