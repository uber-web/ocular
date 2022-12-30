// JS Tool Configurations
const {getBabelConfig} = require('./get-babel-config.cjs');
const {getESLintConfig} = require('./get-eslint-config.cjs');
const {getPrettierConfig} = require('./get-prettier-config.cjs');

// Utilities
const deepMerge = require('deepmerge');

module.exports = {
  // JS Tool Configurations
  getBabelConfig,
  getESLintConfig,
  getPrettierConfig,

  // Utilities
  deepMerge
};
