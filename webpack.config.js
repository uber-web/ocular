/* eslint-disable import/no-extraneous-dependencies */
const {getWebpackConfig} = require('ocular-dev-tools');

module.exports = (env = {}) => {
  const config = getWebpackConfig(env);

  // Make any changes to default config here

  // Uncomment to debug config
  // console.error(JSON.stringify(config, null, 2));

  return [config];
};
