#!/usr/bin/env node

import shell from 'shelljs';
import {join} from 'path';

const scriptDir = new URL(import.meta.url).pathname;
// Runs the bash script and forward the arguments, exiting with the same code
shell.exit(shell.exec(`${join(scriptDir, '../clean.sh')} ${process.argv.slice(2).join(' ')}`).code);
