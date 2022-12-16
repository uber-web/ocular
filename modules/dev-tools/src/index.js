const {getOcularConfig} = require('./helpers/get-ocular-config');

// JS Tool Configurations
const {getBabelConfig} = require('./configuration/get-babel-config');
const {getESLintConfig} = require('./configuration/get-eslint-config');
const {getPrettierConfig} = require('./configuration/get-prettier-config');

// Utilities
const deepMerge = require('deepmerge');

module.exports = {
  // Ocular Configuration
  getOcularConfig,

  // JS Tool Configurations
  getBabelConfig,
  getESLintConfig,
  getPrettierConfig,

  // Utilities
  deepMerge
};
