/* @typedef {import('./get-ocular-config')} default */

import fs from 'fs';
import {resolve} from 'path';
import getAliases, {getModuleInfo} from './aliases.js';
import {shallowMerge, getValidPath, packageDir} from '../utils/utils.js';

export async function getOcularConfig(options = {}) {
  const packageRoot = options.root || process.env.PWD;
  const ocularRoot = resolve(packageDir, '..');

  const IS_MONOREPO = fs.existsSync(resolve(packageRoot, './modules'));

  const userConfig = await getUserConfig(packageRoot, options);

  const config = {
    root: packageRoot,
    ocularPath: ocularRoot,

    esm: getModuleInfo(packageRoot).packageInfo.type === 'module',

    babel:
      userConfig.babel !== false
        ? {
            configPath: getValidPath(
              resolve(packageRoot, './.babelrc'),
              resolve(packageRoot, './.babelrc.js'),
              resolve(packageRoot, './.babelrc.cjs'),
              resolve(packageRoot, './babel.config.js'),
              resolve(packageRoot, './babel.config.cjs')
            ),
            extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx']
          }
        : null,

    bundle: {
      globals: {}
    },

    typescript: {
      project: ''
    },

    lint: {
      paths: IS_MONOREPO ? ['modules'] : ['src'],
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx', 'd.ts']
    },

    coverage: {
      test: 'node'
    },

    aliases: {},

    entry: {
      test: 'test/index.ts',
      'test-browser': 'test/browser.ts',
      bench: 'test/bench/index.ts',
      'bench-browser': 'test/bench/browser.ts',
      size: 'test/size.ts'
    },

    vite: {
      version: 4,
      configPath: getValidPath(
        resolve(packageRoot, './vite.config.js'),
        resolve(packageRoot, './vite.config.cjs'),
        resolve(ocularRoot, 'dist/configuration/vite.config.js')
      )
    }
  };

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
}

// HELPERS

/**
 * TODO better error messages
 * @param {string} packageRoot
 * @param {object} options
 * @returns
 */
async function getUserConfig(packageRoot, options) {
  let userConfig = null;

  const userConfigPath = getValidPath(
    resolve(packageRoot, './.ocularrc.js'),
    resolve(packageRoot, './.ocularrc.cjs'),
    resolve(packageRoot, './.ocular.config.js'),
    resolve(packageRoot, './.ocular.config.cjs'),
    // deprecated
    resolve(packageRoot, './ocular-dev-tools.config.js')
  );

  if (userConfigPath) {
    userConfig = await import(userConfigPath);
    if (userConfig.default) {
      userConfig = userConfig.default;
    }
    if (typeof userConfig === 'function') {
      userConfig = await userConfig(options);
    }
  }

  if (!userConfig) {
    throw new Error('No valid user config found');
  }

  return userConfig;
}
