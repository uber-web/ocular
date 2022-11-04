#!/usr/bin/env node

const shell = require('shelljs');
const path = require('path');

// Runs the bash script and forward the arguments
shell.exec(`${path.resolve(__dirname, './metrics.sh')} ${process.argv.slice(2).join(' ')}`);
