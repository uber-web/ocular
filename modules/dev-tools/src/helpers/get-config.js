/**
 * Used by command line scripts to print a field from the local ocular config.
   Path is period separated.
   Example:
   $ node get-config.js ".babel.configPath"
 */
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
    config = config ? config[path] : undefined;
  });

if (config === undefined) {
  config = '';
}

if (Array.isArray(config)) {
  config = config.join(',');
}

console.log(config);
