import deepMerge from 'deepmerge';

const DEFAULT_CONFIG = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: false
};

export function getPrettierConfig(options: {overrides?: any; debug?: boolean} = {}) {
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
