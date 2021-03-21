/* eslint-disable no-restricted-syntax */
const {log} = require('./log');

const OCULAR_MODULE_NAME = 'gatsby-theme-ocular';

// Finds our theme in the gatsby config and returns the user specified options object
function getOcularOptions(config) {
  for (const plugin of config.plugins) {
    if (plugin === OCULAR_MODULE_NAME) {
      throw new Error(`${OCULAR_MODULE_NAME} used without options in gatsby config`);
    }
    if (plugin && typeof plugin === 'object' && plugin.resolve === OCULAR_MODULE_NAME) {
      const {options} = plugin;
      if (!options) {
        throw new Error(`${OCULAR_MODULE_NAME} used without options in gatsby config`);
      }
      return options;
    }
  }
  log.error(JSON.stringify(config && config.plugins, null, 2))();
  throw new Error(`${OCULAR_MODULE_NAME} not found in gatsby config`);
}

module.exports.OCULAR_MODULE_NAME = OCULAR_MODULE_NAME;
module.exports.getOcularOptions = getOcularOptions;
