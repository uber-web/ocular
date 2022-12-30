const {getPrettierConfig, deepMerge} = require('ocular-dev-tools/configuration');

const defaultConfig = getPrettierConfig({react: '16.8.2'});

// Make any changes to default config here
const config = deepMerge(defaultConfig, {});

// Uncomment to log the eslint config
// console.debug(config);

module.exports = config;
