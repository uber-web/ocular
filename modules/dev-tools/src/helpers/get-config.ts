/**
 * Used by command line scripts to print a field from the local ocular config.
   Path is period separated.
   Example:
   $ node get-config.js ".babel.configPath"
 */
import {getOcularConfig, MaterializedOcularConfig} from './get-ocular-config.js';

let ocularConfig: MaterializedOcularConfig;
try {
  ocularConfig = await getOcularConfig();
} catch (ex) {
  console.error('Error resolving ocular config');
  console.error(ex);
  process.exit(1);
}

const configPath = process.argv[2] || '';

let config: any = ocularConfig;

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
