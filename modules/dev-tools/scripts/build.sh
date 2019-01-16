#!/bin/sh
BABEL_ENV=es6 npx babel src --config-file ./babel.config.js --out-dir dist/es6 --source-maps --ignore 'node_modules/' &&
BABEL_ENV=esm npx babel src --config-file ./babel.config.js --out-dir dist/esm --source-maps --ignore 'node_modules/' &&
BABEL_ENV=es5 npx babel src --config-file ./babel.config.js --out-dir dist/es5 --source-maps --ignore 'node_modules/'