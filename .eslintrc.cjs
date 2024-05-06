const {getESLintConfig} = require('ocular-dev-tools/configuration');

module.exports = getESLintConfig({
  overrides: {
    parserOptions: {
      project: ['./tsconfig.json']
    },

    rules: {
      'import/no-extraneous-dependencies': 0,
      'import/no-unresolved': 0,
      'no-console': 0,
      'no-continue': 0,
      'no-process-env': 0,
      'no-process-exit': 0
    },

    env: {
      node: true
    },

    ignorePatterns: ['modules/gatsby-theme-ocular']
  }
});
