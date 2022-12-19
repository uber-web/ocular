// Launch script for various Node test configurations

// Enables ES2015 import/export in Node.js
const {resolve} = require('path');

// Register module aliases
const tsConfigPaths = require('tsconfig-paths');

const {getOcularConfig} = require('../src/helpers/get-ocular-config');

// Browser test is opt-in by installing @probe.gl/test-utils
let BrowserTestDriver = null;
try {
  BrowserTestDriver = require('@probe.gl/test-utils').BrowserTestDriver;
} catch (error) {
  BrowserTestDriver = null;
}

const mode = process.argv.length >= 3 ? process.argv[2] : 'default';
const ocularConfig = getOcularConfig({aliasMode: mode});
const viteConfigPath = ocularConfig.vite.configPath;

console.log(`Running ${mode} tests...`); // eslint-disable-line
registerModuleAlias(ocularConfig.aliases);

switch (mode) {
  case 'cover':
  case 'node':
  case 'dist':
    require(resolveNodeEntry('test')); // Run the tests
    break;

  case 'bench':
    require(resolveNodeEntry('bench')); // Run the benchmarks
    break;

  case 'browser':
  case 'browser-headless':
    runBrowserTest({
      server: {
        command: 'vite',
        arguments: ['--config', viteConfigPath, '--mode', 'test']
      },
      url: resolveBrowserEntry('test'),
      headless: mode === 'browser-headless'
    });
    break;

  case 'bench-browser':
    runBrowserTest({
      server: {
        command: 'vite',
        arguments: ['--config', viteConfigPath, '--mode', 'bench']
      },
      url: resolveBrowserEntry('bench')
    });
    break;

  default:
    if (/\bbrowser\b/.test(mode)) {
      const testMode = mode.replace('-browser', '').replace('-headless', '');
      runBrowserTest({
        server: {
          command: 'vite',
          arguments: ['--config', viteConfigPath, '--mode', testMode]
        },
        url: resolveBrowserEntry(testMode),
        headless: /\bheadless\b/.test(mode)
      });
    } else if (mode in ocularConfig.entry) {
      require(resolveNodeEntry(mode));
    } else {
      throw new Error(`Unknown test mode ${mode}`);
    }
}

/** Convert ocular alias object to TS config paths object */
function registerModuleAlias(aliases) {
  const result = {};
  for (const key in aliases) {
    const alias = aliases[key];
    result[key] = [alias];
    if (!alias.match(/(\/\*|\.jsx?|\.tsx?|\.cjs)$/)) {
      result[`${key}/*`] = [`${alias}/*`];
    }
  }
  tsConfigPaths.register({
    baseUrl: '.',
    paths: result
  });
}

function resolveNodeEntry(key) {
  return resolve(ocularConfig.entry[key]);
}

function resolveBrowserEntry(key) {
  const fileName = ocularConfig.entry[`${key}-browser`];
  if (fileName.endsWith('.html')) {
    return fileName;
  }
  return '';
}

function runBrowserTest(opts) {
  if (BrowserTestDriver === null) {
    console.log('@probe.gl/test-utils is not installed, skipping browser test');
    // console.log('\033[93m@probe.gl/test-utils is not installed, skipping browser test\033[0m');
    process.exit(0);
  }
  const userConfig = ocularConfig.browserTest || {};
  const options = Object.assign({}, opts, userConfig, {
    server: Object.assign({}, opts.server, userConfig.server),
    browser: Object.assign({}, opts.browser, userConfig.browser)
  });
  return new BrowserTestDriver().run(options);
}
