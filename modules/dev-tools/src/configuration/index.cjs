// JS Tool Configurations
const {getBabelConfig} = require('./get-babel-config.cjs');
const {getESLintConfig} = require('./get-eslint-config.cjs');
const {getPrettierConfig} = require('./get-prettier-config.cjs');

module.exports = {
  // JS Tool Configurations
  getBabelConfig,
  getESLintConfig,
  getPrettierConfig
};
