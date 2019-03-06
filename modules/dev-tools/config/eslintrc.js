const lintConfig = require('./ocular.config').lint;

module.exports = {
  parser: 'babel-eslint',

  plugins: lintConfig.plugins || [],

  extends: lintConfig.extends || [
    'uber-es2015',
    'prettier'
  ],

  rules: Object.assign({
    'guard-for-in': 0,
    'no-inline-comments': 0
  }, lintConfig.rules),

  parserOptions: Object.assign({
    ecmaVersion: 2017
  }, lintConfig.parserOptions),

  overrides: lintConfig.overrides || []
};
