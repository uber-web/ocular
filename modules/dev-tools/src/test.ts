// Launch script for various Node test configurations
import fs from 'fs';
import {resolve} from 'path';
import {execShellCommand} from './utils/utils.js';

import {getOcularConfig} from './helpers/get-ocular-config.js';

import {BrowserTestDriver} from '@probe.gl/test-utils';
import {createServer} from 'vite';

const mode = process.argv.length >= 3 ? process.argv[2] : 'default';
const ocularConfig = await getOcularConfig({aliasMode: mode});
const viteConfigPath = ocularConfig.vite.configPath;

console.log(`Running ${mode} tests...`); // eslint-disable-line

switch (mode) {
  case 'cover':
    if (ocularConfig.coverage.test === 'node') {
      runNodeTest(resolveNodeEntry('test'), 'npx c8');
    } else {
      await runBrowserTest({
        server: {
          start: createViteServer,
          options: {
            mode: 'test'
          }
        },
        url: resolveBrowserEntry('test'),
        headless: 'new',
        onStart: async ({page}) => {
          await page.coverage.startJSCoverage({includeRawScriptCoverage: true});
        },
        onFinish: async ({page, isSuccessful}) => {
          const coverage = await page.coverage.stopJSCoverage();
          if (!isSuccessful) return;
          writeCoverage(coverage);
        }
      });
    }
    break;

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
      headless: mode === 'browser-headless' ? 'new' : false
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
        headless: /\bheadless\b/.test(mode) ? 'new' : false
      });
    } else if (mode in ocularConfig.entry) {
      runNodeTest(resolveNodeEntry(mode));
    } else {
      throw new Error(`Unknown test mode ${mode}`);
    }
}

function resolveNodeEntry(key: string): string {
  const entry = ocularConfig.entry[key];
  if (typeof entry === 'string') {
    return resolve(entry);
  }
  throw new Error(`Cannot find entry point ${key} in ocular config.`);
}

function resolveBrowserEntry(key: string): string {
  const fileName = ocularConfig.entry[`${key}-browser`];
  if (typeof fileName === 'string' && fileName.endsWith('.html')) {
    return fileName;
  } else if (fileName) {
    return 'index.html';
  }
  throw new Error(`Cannot find entry point ${key}-browser in ocular config.`);
}

function runNodeTest(entry: string, command: string = '') {
  // Save module alias
  fs.writeFileSync(
    resolve(ocularConfig.ocularPath, '.alias.json'),
    JSON.stringify(ocularConfig.aliases)
  );

  if (ocularConfig.esm) {
    execShellCommand(
      `NODE_OPTIONS="--experimental-modules --es-module-specifier-resolution=node --loader ${ocularConfig.ocularPath}/dist/helpers/esm-loader.js" ${command} node "${entry}"`
    );
  } else {
    execShellCommand(
      `${command} ts-node -r "${ocularConfig.ocularPath}/dist/helpers/cjs-register.cjs" "${entry}"`
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
    url: server.resolvedUrls?.local[0],
    stop: () => {
      server.close();
    }
  };
}

/** Write raw coverage data to disk for c8 to report */
function writeCoverage(coverage) {
  // c8 default output directory
  const outputDir = './coverage/tmp';
  const outputFile = `${outputDir}/coverage-${Date.now()}`;

  fs.rmSync(outputDir, {force: true, recursive: true});
  fs.mkdirSync(outputDir);

  // Convert Chrome coverage format to v8
  let idx = 0;
  for (const cov of coverage) {
    const it = cov.rawScriptCoverage;
    const filePath = it.url.replace(/^http:\/\/localhost:\d+\//, '');

    // Excluded directories
    if (filePath.match(/(^|\/)(node_modules|test|@vite)\//)) continue;

    // Remap file url to path on local disk
    it.url = resolve(filePath);

    fs.writeFileSync(`${outputFile}-${idx++}.json`, JSON.stringify({result: [it]}), 'utf8');
  }

  // Print coverage to console
  execShellCommand('npx c8 report --reporter=text');
}
