/** @typedef {import('./get-prettier-config')} types */
const deepMerge = require('deepmerge');

const DEFAULT_CONFIG = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: false
};

/** @type {types['getPrettierConfig']} */
module.exports.getPrettierConfig = function getPrettierConfig(options = {}) {
  let config = {...DEFAULT_CONFIG};
  if (options.overrides) {
    config = deepMerge(config, options.overrides);
  }
  if (options.debug) {
    // eslint-disable-next-line
    console.log(config);
  }
  return config;
};
