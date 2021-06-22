const {getOcularConfig} = require('./helpers/get-ocular-config');

// JS Tool Configurations
const {getBabelConfig} = require('./configuration/get-babel-config');
const {getESLintConfig} = require('./configuration/get-eslint-config');
const {getPrettierConfig} = require('./configuration/get-prettier-config');
const {getWebpackConfig} = require('./configuration/get-webpack-config');

// Utilities
const deepMerge = require('deepmerge');

module.exports = {
  // Ocular Configuration
  getOcularConfig,

  // JS Tool Configurations
  getBabelConfig,
  getESLintConfig,
  getPrettierConfig,
  getWebpackConfig,

  // Utilities
  deepMerge
};
