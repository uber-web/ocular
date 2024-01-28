#!/usr/bin/env node

import esbuild from 'esbuild';
import {getBundleConfig} from '../src/configuration/get-esbuild-config.js';

// Parse command line arguments
let entryPoint;
const env = {};

for (let i = 1; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg.startsWith('--')) {
    const tokens = arg.slice(2).split('=');
    env[tokens[0]] = tokens[1] === undefined ? true : tokens[1];
  } else if (!entryPoint && arg.match(/\.(js|ts|cjs|mjs|jsx|tsx)$/)) {
    entryPoint = arg;
  }
}

const buildConfig = await getBundleConfig({
  ...env,
  input: entryPoint
});

if (env.watch) {
  buildConfig.watch = true;
  await esbuild.build(buildConfig);
  /* eslint-disable no-console */
  console.log('watching...');
} else {
  const result = await esbuild.build(buildConfig);
  if (result.errors.length > 0) {
    process.exit(1);
  }
}
