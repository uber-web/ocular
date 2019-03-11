// Registers an alias for this module
const {resolve} = require('path');
const fs = require('fs');

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
function getSubmodules(packageRoot) {
  const submodules = {};
  const parentPath = resolve(packageRoot, './modules');

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
    const moduleInfo = getModuleInfo(packageRoot);
    submodules[moduleInfo.name] = moduleInfo;
  }

  return submodules;
}

function getAliases(mode = 'src', packageRoot = process.env.PWD) {
  const aliases = {};
  const submodules = getSubmodules(packageRoot);

  for (const moduleName in submodules) {
    const {path, packageInfo} = submodules[moduleName];
    aliases[`${moduleName}/test`] = resolve(path, 'test');
    if (mode === 'src') {
      aliases[moduleName] = resolve(path, 'src');
    } else {
      const subPath = packageInfo.main && packageInfo.main.replace('/index.js', '');
      aliases[moduleName] = subPath ? resolve(path, subPath) : path;
    }
  }

  return aliases;
}

module.exports = getAliases;

