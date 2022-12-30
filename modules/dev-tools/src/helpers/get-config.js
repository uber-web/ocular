import {getOcularConfig} from '../helpers/get-ocular-config.js';

let ocularConfig;
try {
  ocularConfig = await getOcularConfig();
} catch (ex) {
  console.error('Error resolving ocular config');
  console.error(ex);
  process.exit(1);
}

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
