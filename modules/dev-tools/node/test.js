// Launch script for various Node test configurations

// Enables ES2015 import/export in Node.js
require('reify');
const {resolve} = require('path');

/* global process */
const moduleAlias = require('module-alias');

const getAliases = require('./aliases');
moduleAlias.addAliases(getAliases('src'));

const config = require('../config/ocular.config');
const webpackConfigPath = resolve(__dirname, '../config/webpack.config');

const {BrowserTestDriver} = require('@probe.gl/test-utils');

const mode = process.argv.length >= 3 ? process.argv[2] : 'default';
console.log(`Running ${mode} tests...`); // eslint-disable-line

function resolveEntry(key) {
  return resolve(config.entry[key]);
}

switch (mode) {
  case 'node':
    require(resolveEntry('test-node')); // Run the tests
    break;

  case 'dist':
    // Load deck.gl itself from the dist folder
    moduleAlias.addAliases(getAliases('dist'));
    require(resolveEntry('test-node')); // Run the tests
    break;

  case 'bench':
    require(resolveEntry('bench-node')); // Run the benchmarks
    break;

  case 'browser':
  case 'browser-headless':
    new BrowserTestDriver().run({
      command: 'webpack-dev-server',
      arguments: ['--config', webpackConfigPath, '--env.mode=test'],
      headless: mode === 'browser-headless'
    });
    break;

  case 'bench-browser':
    new BrowserTestDriver().run({
      command: 'webpack-dev-server',
      arguments: ['--config', webpackConfigPath, '--env.mode=bench']
    });
    break;

  default:
    throw new Error `Unknown test mode ${mode}`;
}
