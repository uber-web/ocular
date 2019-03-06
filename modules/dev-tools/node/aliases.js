// Registers an alias for this module
const {resolve} = require('path');
const fs = require('fs');
const config = require('../config/ocular.config');

// Get information of all submodules
function getSubmodules() {
  const parentPath = resolve('./modules');

  const submodules = {};
  fs.readdirSync(parentPath)
  .forEach(item => {
    const itemPath = resolve(parentPath, item);
    if (fs.lstatSync(itemPath).isDirectory()) {
      try {
        const packageInfo = require(resolve(itemPath, 'package.json'));
        submodules[packageInfo.name] = {
          path: itemPath,
          packageInfo
        };
      } catch (err) {
        // ignore if sub directory does not contain package.json
      }
    }
  });

  return submodules;
}

function getAliases(mode = 'src') {
  const aliases = config.aliases;
  const submodules = getSubmodules();

  for (const moduleName in submodules) {
    const {path, packageInfo} = submodules[moduleName];
    if (mode === 'src') {
      aliases[moduleName] = resolve(path, 'src');
    } else {
      const subPath = packageInfo.main.replace('/index.js', '');
      aliases[moduleName] = resolve(path, subPath);
    }
  }

  return aliases;
}

module.exports = getAliases;

