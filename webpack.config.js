/* eslint-disable import/no-extraneous-dependencies */
const {getWebpackConfig} = require('ocular-dev-tools');

module.exports = (env = {}) => {
  const config = getWebpackConfig(env);

  // Make any changes to default config here
  // https://github.com/prettier/prettier/issues/4879
  console.error(env);
  delete config.node.fs;

  // Uncomment to debug config
  // console.error(JSON.stringify(config, null, 2));

  return [config];
};
