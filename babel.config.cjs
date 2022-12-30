const {getBabelConfig} = require('ocular-dev-tools/configuration');

module.exports = getBabelConfig({
  react: true,
  overrides: {
    plugins: ['@babel/syntax-import-assertions']
  }
});
