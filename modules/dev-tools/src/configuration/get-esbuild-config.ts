// / For bundles published to npm
import fs from 'fs';
import {join} from 'path';
import util from 'util';
import {getOcularConfig} from '../helpers/get-ocular-config.js';
import ext from 'esbuild-plugin-external-global';
import type {BuildOptions, Plugin} from 'esbuild';

/**
 * Get list of dependencies to exclude using esbuild-plugin-external-global
 * @param externalPackages string[]
 */
// function getExternalGlobalsAMD(externalPackages) {
//   const externals = {};
//   for (const packageName of externalPackages) {
//     externals[packageName] = `typeof require === 'function' ? require('${packageName}') : null`;
//   }
//   return externals;
// }

/**
 * Get list of dependencies to exclude using esbuild-plugin-external-global
 * @param externalPackages string[]
 * @param mapping {[pattern: string]: replacement}
 */
function getExternalGlobalsIIFE(externalPackages: string[], mapping: Record<string, string>) {
  const externals: Record<string, string> = {};
  for (const packageName of externalPackages) {
    for (const key in mapping) {
      if (packageName.search(key) === 0) {
        externals[packageName] = mapping[key];
        break;
      }
    }
  }
  return externals;
}

// esbuild does not support umd format
// Work around from https://github.com/evanw/esbuild/issues/819
// Template: https://webpack.js.org/configuration/output/#type-umd
function umdWrapper(libName: string | undefined) {
  return {
    format: 'iife',
    globalName: '__exports__',
    banner: {
      js: `\
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
        ${
          libName
            ? `else if (typeof exports === 'object') exports['${libName}'] = factory();
  else root['${libName}'] = factory();`
            : `else {
  var a = factory();
  for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
}`
        }})(globalThis, function () {`
    },
    footer: {
      js: `\
      return __exports__;
      });`
    }
  };
}

/**
 * ESBuild plugin to inline important ESM-only dependencies, for CJS compatibility.
 * Reference: https://github.com/evanw/esbuild/issues/3442
 */
const inlineESMOnly = (): Plugin => {
  const packageRoot = process.cwd();
  const root = join(packageRoot, '../..');

  return {
    name: 'inline-esm-only',
    setup(build) {
      // TODO: Detect ESM-only from package.json, instead of hard-coding package names?
      build.onResolve({filter: /^@mapbox\/tiny\-sdf$/}, () => {
        const path = join(root, 'node_modules/@mapbox/tiny-sdf/index.js');
        return {path, external: false};
      });
    }
  };
};

/** Returns esbuild config for building .cjs bundles */
export async function getCJSExportConfig(opts: {
  input: string;
  output: string;
}): Promise<BuildOptions> {
  return {
    entryPoints: [opts.input],
    outfile: opts.output,
    bundle: true,
    format: 'cjs',
    // Node 16 is out of support, kept for compatibility. Move to 18?
    target: 'node16',
    packages: 'external',
    sourcemap: true,
    logLevel: 'info',
    plugins: [inlineESMOnly()]
  };
}

type BundleOptions = {
  input: string;
  env?: 'dev' | 'prod';
  output?: string;
  format?: 'iife' | 'cjs' | 'esm' | 'umd';
  target?: string[];
  externals?: string[];
  globalName?: string;
  globals?: {[pattern: string]: string};
  debug?: boolean;
  sourcemap?: boolean;
};

/* eslint-disable max-statements,complexity */
/** Returns esbuild config for building standalone bundles */
export async function getBundleConfig(opts: BundleOptions): Promise<BuildOptions> {
  // This script must be executed in a submodule's directory
  const packageRoot = process.cwd();
  const packageInfo = JSON.parse(fs.readFileSync(join(packageRoot, 'package.json'), 'utf-8'));

  const devMode = opts.env === 'dev';

  const ocularConfig = await getOcularConfig({
    root: join(packageRoot, '../..'),
    aliasMode: devMode ? 'src' : 'dist'
  });

  opts = {...ocularConfig.bundle, ...opts};

  const {
    input,
    output = devMode ? './dist/dist.dev.js' : './dist.min.js',
    format = 'iife',
    target = ['esnext'],
    externals,
    globalName,
    debug,
    sourcemap = false
  } = opts;

  let babelConfig;

  let externalPackages = Object.keys(packageInfo.peerDependencies || {});
  if (typeof externals === 'string') {
    externalPackages = externalPackages.concat((externals as string).split(','));
  } else if (Array.isArray(externals)) {
    externalPackages = externalPackages.concat(externals);
  }

  const config: BuildOptions = {
    entryPoints: [input],
    outfile: output,
    bundle: true,
    // @ts-expect-error umd is not supported by esbuild, will be overwritten below
    format,
    minify: !devMode,
    alias: ocularConfig.aliases,
    platform: 'browser',
    target,
    logLevel: 'info',
    sourcemap,
    plugins: []
  };
  if (globalName) {
    config.globalName = globalName;
  }

  let externalGlobals;
  switch (format) {
    case 'cjs':
    case 'esm':
      // Use esbuild's built-in external functionality
      config.packages = 'external';
      if (externals) {
        config.external = externals;
      }
      break;

    case 'umd':
      Object.assign(config, umdWrapper(globalName));
      externalGlobals = getExternalGlobalsIIFE(externalPackages, ocularConfig.bundle.globals);
      break;

    case 'iife':
      externalGlobals = getExternalGlobalsIIFE(externalPackages, ocularConfig.bundle.globals);
      break;

    default:
      break;
  }
  if (externalGlobals) {
    config.plugins!.unshift(ext.externalGlobalPlugin(externalGlobals));
  }

  if (debug) {
    const printableConfig = {
      ...config,
      plugins: config.plugins!.map((item) => {
        return {
          name: item.name,
          options: item.name === 'babel' ? babelConfig : externalGlobals
        };
      })
    };

    console.log(util.inspect(printableConfig, {showHidden: false, depth: null, colors: true}));
  }

  return config;
}
