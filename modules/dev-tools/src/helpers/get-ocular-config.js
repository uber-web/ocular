/* @typedef {import('./get-ocular-config')} default */

const fs = require('fs');
const {resolve} = require('path');
const getAliases = require('../../node/aliases');
const {shallowMerge} = require('../utils/utils');

module.exports = function getOcularConfig(options = {}) {
  const packageRoot = options.root || process.env.PWD;

  const IS_MONOREPO = fs.existsSync(resolve(packageRoot, './modules'));

  const config = {
    babel: {
      configPath: getValidPath([
        resolve(packageRoot, './.babelrc.js'),
        resolve(packageRoot, './.babelrc'),
        resolve(packageRoot, './babel.config.js'),
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

  const userConfig = getUserConfig(packageRoot, options);

  shallowMerge(config, userConfig);

  // const aliasMode = userConfig.aliasMode || options.aliasMode;

  // User's aliases need to come first, due to module-alias resolve order
  Object.assign(config.aliases, getAliases(userConfig.aliasMode, packageRoot));

  return config;
};

// HELPERS

/**
 * TODO better error messages
 * @param {string} packageRoot
 * @param {object} options
 * @returns
 */
function getUserConfig(packageRoot, options) {
  let userConfig = null;

  let userConfigPath;

  userConfigPath = resolve(packageRoot, './.ocularrc.js');
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
  userConfigPath = resolve(packageRoot, './ocular-dev-tools.config.js');
  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }

  if (!userConfig) {
    throw new Error('No valid user config found in .ocularrc.js');
  }

  return userConfig;
}

function getValidPath(resolveOrder) {
  return resolveOrder.find((path) => fs.existsSync(path));
}
