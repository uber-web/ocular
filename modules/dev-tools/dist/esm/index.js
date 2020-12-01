var _require = require('./helpers/get-ocular-config'),
    getOcularConfig = _require.getOcularConfig;

var _require2 = require('./configuration/get-babel-config'),
    getBabelConfig = _require2.getBabelConfig;

var _require3 = require('./configuration/get-eslint-config'),
    getESLintConfig = _require3.getESLintConfig;

var _require4 = require('./configuration/get-prettier-config'),
    getPrettierConfig = _require4.getPrettierConfig;

var _require5 = require('./configuration/get-webpack-config'),
    getWebpackConfig = _require5.getWebpackConfig;

var deepMerge = require('deepmerge');

module.exports = {
  getOcularConfig: getOcularConfig,
  getBabelConfig: getBabelConfig,
  getESLintConfig: getESLintConfig,
  getPrettierConfig: getPrettierConfig,
  getWebpackConfig: getWebpackConfig,
  deepMerge: deepMerge
};
//# sourceMappingURL=index.js.map