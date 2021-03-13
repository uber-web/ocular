/** @typedef {import('./get-ocular-config')} types */

const fs = require('fs');
const {resolve} = require('path');
const getAliases = require('../../node/aliases');
const {shallowMerge} = require('../utils/utils');

/** @type {types['getOcularConfig']} */
module.exports = function getOcularConfig(options = {}) {
  const packageRoot = options.root || process.env.PWD;

  const IS_MONOREPO = fs.existsSync(resolve(packageRoot, './modules'));

  const config = {
    babel: {
      configPath: getValidPath([
        resolve(packageRoot, './babel.config.js'),
        resolve(packageRoot, './.babelrc'),
        resolve(__dirname, './babel.config.js')
      ]),
      extensions: ['.es6', '.js', '.es', '.jsx', '.mjs']
    },

    lint: {
      paths: IS_MONOREPO ? ['modules'] : ['src'],
      extensions: ['js', 'md']
    },

    aliases: {},

    entry: {
      test: 'test/index',
      'test-browser': 'test/browser',
      bench: 'test/bench/index',
      'bench-browser': 'test/bench/browser',
      size: 'test/size'
    },

    webpack: {
      configPath: getValidPath([
        resolve(packageRoot, './webpack.config.js'),
        resolve(__dirname, './webpack.config.js')
      ])
    }
  };

  let userConfig = {};

  let userConfigPath = resolve(packageRoot, './ocular-dev-tools.config.js');
  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }
  userConfigPath = resolve(packageRoot, './ocular.config.js');
  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }
  userConfigPath = resolve(packageRoot, './.ocularrc.js');
  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }

  shallowMerge(config, userConfig);

  // const aliasMode = userConfig.aliasMode || options.aliasMode;

  // User's aliases need to come first, due to module-alias resolve order
  Object.assign(config.aliases, getAliases(userConfig.aliasMode, packageRoot));

  return config;
};

// HELPERS

function getValidPath(resolveOrder) {
  return resolveOrder.find(path => fs.existsSync(path));
}
