const {getESLintConfig} = require('ocular-dev-tools');

const config = getESLintConfig({react: '16.8.2'});

// Make any changes to default config here

// We are importing ourselves
config.rules['import/no-extraneous-dependencies'] = 0;
config.rules['no-console'] = 0;
config.rules['no-process-env'] = 0;
config.rules['no-process-exit'] = 0;

config.env = {node: true};

config.ignorePatterns.push('modules/dev-tools/test/ts-smoosh/fixtures');

// Uncomment to log the eslint config
console.debug(config);

module.exports = config;
