const fs = require('fs');
const {resolve} = require('path');
const getAliases = require('../node/aliases');

function shallowMerge(base, override) {
  for (const key in override) {
    if (base[key] && typeof base[key] === 'object') {
      Object.assign(base[key], override[key])
    } else {
      base[key] = override[key];
    }
  }
  return base;
}

function getValidPath(resolveOrder) {
  return resolveOrder.find(path => fs.existsSync(path));
}

/*
 * opts.root - path to package root, default `pwd`
 * opts.aliasMode - default `src`
 */
module.exports = (opts = {}) => {
  const packageRoot = opts.root || process.env.PWD;

  const IS_MONOREPO = fs.existsSync(resolve(packageRoot, './modules'));

  const config = {
    babel: {
      configPath: getValidPath([
        resolve(packageRoot, './babel.config.js'),
        resolve(packageRoot, './.babelrc'),
        resolve(__dirname, './babel.config.js')
      ])
    },

    lint: {
      paths: IS_MONOREPO ? ['modules'] : ['src'],
      extensions: ['js', 'md']
    },

    aliases: {},

    entry: {
      'test': 'test/index',
      'test-browser': 'test/browser',
      'bench': 'test/bench/index',
      'bench-browser': 'test/bench/browser',
      'size': 'test/size'
    },

    webpack: {
      configPath: getValidPath([
        resolve(packageRoot, './webpack.config.js'),
        resolve(__dirname, './webpack.config.js')
      ])
    }
  };

  const userConfigPath = resolve(packageRoot, './ocular-dev-tools.config.js');
  let userConfig = {};

  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(opts);
    }
  }

  shallowMerge(config, userConfig);

  // User's aliases need to come first, due to module-alias resolve order
  Object.assign(config.aliases, getAliases(opts.aliasMode, packageRoot));

  return config;
};
