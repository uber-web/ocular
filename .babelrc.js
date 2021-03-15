const {getBabelConfig} = require('ocular-dev-tools');

module.exports = (api) => {
  const config = getBabelConfig(api, {react: true});

  // Make any changes to default config here

  // Uncomment to log the config
  // console.debug(config);

  return config;
};
