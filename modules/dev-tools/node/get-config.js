const {getOcularConfig} = require('../src/helpers/get-ocular-config');

const ocularConfig = getOcularConfig();

const configPath = process.argv[2] || '';

/** @type {any} */
let config = ocularConfig;

configPath
  .split('.')
  .filter(Boolean)
  .forEach((path) => {
    config = config[path];
  });

if (config === undefined) {
  config = '';
}

if (Array.isArray(config)) {
  config = config.join(',');
}

console.log(config);
