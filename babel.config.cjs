const {getBabelConfig, deepMerge} = require('ocular-dev-tools/configuration');

module.exports = (api) => {
  const defaultConfig = getBabelConfig(api, {react: true});

  // Make any changes to default config here
  const config = deepMerge(defaultConfig, {
    plugins: ['@babel/syntax-import-assertions']
  });

  // Uncomment to log the config
  // console.debug(config);

  return config;
};
