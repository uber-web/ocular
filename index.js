#!/usr/bin/env node

const {spawn, execSync} = require('child_process');

const DIR_PATH = process.env.PWD;

const env = Object.assign(process.env, {
  DIR_PATH,
});

const commands = {

  start: () => {

    spawn('./node_modules/.bin/webpack-dev-server', [
      '--config',
      'webpack/dev',
    ], {cwd: __dirname, stdio: 'inherit', env});

  },

  lint: () => {

    spawn('./node_modules/.bin/eslint', [
      DIR_PATH,
      '-c',
      '.eslintrc',
    ], {cwd: __dirname, stdio: 'inherit'});

  },

  build: () => {

    execSync(`rm -rf ${DIR_PATH}/dist`);

    spawn('./node_modules/.bin/webpack', [
      '--config',
      'webpack/build',
    ], {
      cwd: __dirname,
      stdio: 'inherit',
      env: Object.assign(env, {NODE_ENV: 'production'}),
    });

  },

};

const command = process.argv[2];
if (!commands[command]) { return; }

commands[command]();
