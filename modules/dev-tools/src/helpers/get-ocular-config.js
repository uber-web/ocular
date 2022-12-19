/* @typedef {import('./get-ocular-config')} default */

const fs = require('fs');
const {resolve} = require('path');
const getAliases = require('../../node/aliases');
const {shallowMerge} = require('../utils/utils');

module.exports.getOcularConfig = function getOcularConfig(options = {}) {
  const packageRoot = options.root || process.env.PWD;
  const ocularRoot = resolve(__dirname, '../..');

  const IS_MONOREPO = fs.existsSync(resolve(packageRoot, './modules'));

  const config = {
    root: packageRoot,
    ocularPath: ocularRoot,

    babel: {
      configPath: getValidPath([
        resolve(packageRoot, './.babelrc.js'),
        resolve(packageRoot, './.babelrc'),
        resolve(packageRoot, './babel.config.js')
      ]),
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx']
    },

    lint: {
      paths: IS_MONOREPO ? ['modules'] : ['src'],
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx', 'd.ts']
    },

    aliases: {},

    entry: {
      test: 'test/index',
      'test-browser': 'test/browser',
      bench: 'test/bench/index',
      'bench-browser': 'test/bench/browser',
      size: 'test/size'
    },

    vite: {
      version: 4,
      configPath: getValidPath([
        resolve(packageRoot, './vite.config.js'),
        resolve(ocularRoot, 'src/configuration/vite.config.js')
      ])
    }
  };

  const userConfig = getUserConfig(packageRoot, options);

  shallowMerge(config, userConfig);

  // Backward compatibility
  if (typeof userConfig.entry.size === 'string') {
    userConfig.entry.size = [userConfig.entry.size];
  }

  const aliasMode = userConfig.aliasMode || options.aliasMode;

  // User's aliases need to come first, due to module-alias resolve order
  Object.assign(config.aliases, getAliases(aliasMode, packageRoot));

  if (aliasMode && !aliasMode.includes('browser')) {
    Object.assign(config.aliases, userConfig.nodeAliases);
  }

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

  // Standard config file
  userConfigPath = resolve(packageRoot, './.ocularrc.js');
  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }
  // Compatibility with type:module packages
  userConfigPath = resolve(packageRoot, './.ocularrc.cjs');
  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }
  // Backward compatibility
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
