// Launch script for various Node test configurations
import fs from 'fs';
import {resolve} from 'path';
import {execShellCommand} from './utils/shell.js';

import {getOcularConfig} from './helpers/get-ocular-config.js';

import {BrowserTestDriver} from '@probe.gl/test-utils';
import {createServer} from 'vite';

const mode = process.argv.length >= 3 ? process.argv[2] : 'default';
const ocularConfig = await getOcularConfig({aliasMode: mode});
const viteConfigPath = ocularConfig.vite.configPath;

console.log(`Running ${mode} tests...`); // eslint-disable-line

switch (mode) {
  case 'cover':
  case 'node':
  case 'dist':
    runNodeTest(resolveNodeEntry('test')); // Run the tests
    break;

  case 'bench':
    runNodeTest(resolveNodeEntry('bench')); // Run the benchmarks
    break;

  case 'browser':
  case 'browser-headless':
    await runBrowserTest({
      server: {
        start: createViteServer,
        options: {
          mode: 'test'
        }
      },
      url: resolveBrowserEntry('test'),
      headless: mode === 'browser-headless'
    });
    break;

  default:
    if (/\bbrowser\b/.test(mode)) {
      const testMode = mode.replace('-browser', '').replace('-headless', '');
      await runBrowserTest({
        server: {
          start: createViteServer,
          options: {
            mode: testMode
          }
        },
        url: resolveBrowserEntry(testMode),
        headless: /\bheadless\b/.test(mode)
      });
    } else if (mode in ocularConfig.entry) {
      runNodeTest(resolveNodeEntry(mode));
    } else {
      throw new Error(`Unknown test mode ${mode}`);
    }
}

function resolveNodeEntry(key) {
  // @ts-expect-error key may not exist
  const entry = ocularConfig.entry[key];
  if (typeof entry === 'string') {
    return resolve(entry);
  }
  throw new Error(`Cannot find entry point ${key} in ocular config.`);
}

function resolveBrowserEntry(key) {
  const fileName = ocularConfig.entry[`${key}-browser`];
  if (typeof fileName === 'string' && fileName.endsWith('.html')) {
    return fileName;
  } else if (fileName) {
    return 'index.html';
  }
  throw new Error(`Cannot find entry point ${key}-browser in ocular config.`);
}

function runNodeTest(entry) {
  // Save module alias
  fs.writeFileSync(
    resolve(ocularConfig.ocularPath, '.alias.json'),
    JSON.stringify(ocularConfig.aliases)
  );

  if (ocularConfig.esm) {
    execShellCommand(
      `NODE_OPTIONS="--experimental-modules --es-module-specifier-resolution=node --loader ${ocularConfig.ocularPath}/src/helpers/esm-loader.js" node "${entry}"`
    );
  } else {
    execShellCommand(
      `ts-node -r "${ocularConfig.ocularPath}/src/helpers/cjs-register.cjs" "${entry}"`
    );
  }
}

function runBrowserTest(opts) {
  const userConfig = ocularConfig.browserTest || {};
  return new BrowserTestDriver().run({
    ...opts,
    ...userConfig,
    server: {...opts.server, ...userConfig.server},
    browser: {...opts.browser, ...userConfig.browser}
  });
}

async function createViteServer(config) {
  const server = await createServer({
    configFile: viteConfigPath,
    mode: config.options?.mode,
    server: {
      port: config.port
    }
  });
  await server.listen();

  return {
    url: server.resolvedUrls.local[0],
    stop: () => {
      server.close();
    }
  };
}
