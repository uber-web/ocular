// Launch script for various Node test configurations

// Enables ES2015 import/export in Node.js
require('reify');
const {resolve} = require('path');

/* global process */
const moduleAlias = require('module-alias');

const getAliases = require('./aliases');
moduleAlias.addAliases(getAliases('src'));

const config = require('../config/ocular.config');

// Browser test is opt-in by installing @probe.gl/test-utils
let BrowserTestDriver = null;
try {
  BrowserTestDriver = require('@probe.gl/test-utils').BrowserTestDriver;
} catch (error) {
  BrowserTestDriver = null;
}

const mode = process.argv.length >= 3 ? process.argv[2] : 'default';
console.log(`Running ${mode} tests...`); // eslint-disable-line

function resolveEntry(key) {
  return resolve(config.entry[key]);
}

function runBrowserTest(opts) {
  if (BrowserTestDriver === null) {
    console.log('\033[93m@probe.gl/test-utils is not installed, skipping browser test\033[0m');
    process.exit(0);
  }
  return new BrowserTestDriver().run(opts);
}

switch (mode) {
  case 'node':
    require(resolveEntry('test')); // Run the tests
    break;

  case 'cover':
  case 'dist':
    // Load deck.gl itself from the dist folder
    moduleAlias.addAliases(getAliases('dist'));
    require(resolveEntry('test')); // Run the tests
    break;

  case 'bench':
    require(resolveEntry('bench')); // Run the benchmarks
    break;

  case 'browser':
  case 'browser-headless':
    runBrowserTest({
      command: 'webpack-dev-server',
      arguments: ['--config', config.webpack.configPath, '--env.mode=test'],
      headless: mode === 'browser-headless'
    });
    break;

  case 'bench-browser':
    runBrowserTest({
      command: 'webpack-dev-server',
      arguments: ['--config', config.webpack.configPath, '--env.mode=bench']
    });
    break;

  default:
    if (/\bbrowser\b/.test(mode)) {
      runBrowserTest({
        command: 'webpack-dev-server',
        arguments: [
          '--config',
          config.webpack.configPath,
          `--env.mode=${mode.replace('-browser', '').replace('-headless', '')}`
        ],
        headless: /\bheadless\b/.test(mode)
      });
    } else if (mode in config.entry) {
      require(resolveEntry(mode));
    } else {
      throw new Error `Unknown test mode ${mode}`;
    }
}
