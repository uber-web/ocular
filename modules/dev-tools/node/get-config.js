let config = require('../config/ocular.config')();

const configPath = process.argv[2] || '';

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
