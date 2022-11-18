#!/usr/bin/env node

const shell = require('shelljs');
const path = require('path');

// Runs the bash script and forward the arguments, exiting with the same code
shell.exit(
  shell.exec(`${path.resolve(__dirname, './lint.sh')} ${process.argv.slice(2).join(' ')}`).code
);
