const {getESLintConfig, deepMerge} = require('ocular-dev-tools');

const defaultConfig = getESLintConfig({react: '16.8.2'});

// Make any changes to default config here

// We are importing ourselves
const config = deepMerge(defaultConfig, {
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'no-process-env': 0,
    'no-process-exit': 0
  },

  env: {
    node: true
  },

  ignorePatterns: ['modules/gatsby-theme-ocular', 'modules/dev-tools/test/ts-smoosh/fixtures']
});

// Uncomment to log the eslint config
// console.debug(config);

module.exports = config;
