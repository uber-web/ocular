/** @typedef {import('./get-prettier-config')} types */
import deepMerge from 'deepmerge';

const DEFAULT_CONFIG = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: false
};

/** @type {types['getPrettierConfig']} */
export function getPrettierConfig(options = {}) {
  let config = {...DEFAULT_CONFIG};
  if (options.overrides) {
    config = deepMerge(config, options.overrides);
  }
  if (options.debug) {
    // eslint-disable-next-line
    console.log(config);
  }
  return config;
}
