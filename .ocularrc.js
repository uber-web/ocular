/** @typedef {import('ocular-dev-tools').OcularConfig} OcularConfig */
const {resolve} = require('path');

/** @type {OcularConfig} */
let ocularConfig = {
  typescript: {
    check: true
  },

  lint: {
    paths: ['modules']
  },

  aliases: {
    test: resolve(__dirname, 'test')
  },

  entry: {
    test: 'test/node.js',
    'test-browser': 'test/browser.js',
    bench: 'test/bench/node.js',
    'bench-browser': 'test/bench/browser.js',
    size: 'test/size/import-nothing.js'
  }
};

module.exports = ocularConfig;
