"use strict";

var fs = require('fs');

var _require = require('path'),
    resolve = _require.resolve;

var getAliases = require('../../node/aliases');

var _require2 = require('../utils/utils'),
    shallowMerge = _require2.shallowMerge;

module.exports.getOcularConfig = function getOcularConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var packageRoot = options.root || process.env.PWD;
  var IS_MONOREPO = fs.existsSync(resolve(packageRoot, './modules'));
  var config = {
    babel: {
      configPath: getValidPath([resolve(packageRoot, './.babelrc.js'), resolve(packageRoot, './.babelrc'), resolve(packageRoot, './babel.config.js'), resolve(__dirname, './babel.config.js')]),
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
      version: 4,
      configPath: getValidPath([resolve(packageRoot, './webpack.config.js'), resolve(__dirname, './webpack.config.js')])
    }
  };
  var userConfig = getUserConfig(packageRoot, options);
  shallowMerge(config, userConfig);
  Object.assign(config.aliases, getAliases(userConfig.aliasMode, packageRoot));
  return config;
};

function getUserConfig(packageRoot, options) {
  var userConfig = null;
  var userConfigPath;
  userConfigPath = resolve(packageRoot, './.ocularrc.js');

  if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);

    if (typeof userConfig === 'function') {
      userConfig = userConfig(options);
    }
  }

  userConfigPath = resolve(packageRoot, './.ocularrc.cjs');

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
  return resolveOrder.find(function (path) {
    return fs.existsSync(path);
  });
}
//# sourceMappingURL=get-ocular-config.js.map