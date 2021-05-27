module.exports = {
  // Ocular Configuration
  getOcularConfig: require('./helpers/get-ocular-config'),

  // JS Tool Configurations
  getBabelConfig: require('./configuration/get-babel-config'),
  getESLintConfig: require('./configuration/get-eslint-config'),
  getPrettierConfig: require('./configuration/get-prettier-config'),
  getWebpackConfig: require('./configuration/get-webpack-config'),

  // Utilities
  deepMerge: require('deepmerge')
};
