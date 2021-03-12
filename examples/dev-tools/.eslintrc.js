const { getESLintConfig } = require("ocular-dev-tools");

const config = getESLintConfig();

// Make any changes to default config here

// Uncomment to log the config
console.debug(config);

return config;
