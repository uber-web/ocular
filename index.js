#!/usr/bin/env node

const {spawn} = require('child_process');

const [DIR_PATH] = process.argv[1].split('/node_modules/');

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

  test: () => {

    spawn('./node_modules/.bin/ava', [
      DIR_PATH,
    ], {cwd: __dirname, stdio: 'inherit'});

  },

};

const command = process.argv[2];
if (!commands[command]) { return; }

commands[command]();
