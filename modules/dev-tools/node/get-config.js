let config = require('../config/ocular.config')();

const configPath = process.argv[2] || '';

configPath.split('.')
  .filter(Boolean)
  .forEach(path => {
    config = config[path];
  });

if (typeof config !== 'string') {
  config = JSON.stringify(config);
}
console.log(config);
