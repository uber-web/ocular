#!/usr/bin/env node

const {smoosh} = require('../src/ts-smoosh/smoosh');

// Given an array of `.js` files, smooshes their .d.ts declarations and
// produces a .tsx file.

const without = (ending) => (fileName) =>
  fileName.endsWith(ending) ? fileName.substr(0, fileName.length - ending.length) : fileName;

const files = process.argv.slice(2);

files.map(without('.js')).map(smoosh);
