const {getBabelConfig, deepMerge} = require('ocular-dev-tools');

module.exports = (api) => {
  const defaultConfig = getBabelConfig(api, {react: true});

  // Make any changes to default config here
  const config = deepMerge(defaultConfig, {});

  // Uncomment to log the config
  // console.debug(config);

  return config;
};
