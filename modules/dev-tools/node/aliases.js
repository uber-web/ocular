// Registers an alias for this module
const {resolve} = require('path');
const fs = require('fs');
const config = require('../config/ocular.config');

function getModuleInfo(path) {
  if (fs.lstatSync(path).isDirectory()) {
    try {
      const packageInfo = require(resolve(path, 'package.json'));
      return {
        name: packageInfo.name,
        path,
        packageInfo
      };
    } catch (err) {
      // ignore if sub directory does not contain package.json
    }
  }
  return null;
}

// Get information of all submodules
function getSubmodules() {
  const submodules = {};
  const parentPath = resolve('./modules');

  if (fs.existsSync(parentPath)) {
    //monorepo
    fs.readdirSync(parentPath)
    .forEach(item => {
      const itemPath = resolve(parentPath, item);
      const moduleInfo = getModuleInfo(itemPath);
      if (moduleInfo) {
        submodules[moduleInfo.name] = moduleInfo;
      }
    });
  } else {
    const moduleInfo = getModuleInfo('.');
    submodules[moduleInfo.name] = moduleInfo;
  }

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

