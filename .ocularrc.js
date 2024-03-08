/** @typedef {import('ocular-dev-tools').OcularConfig} OcularConfig */
import {resolve} from 'path';

/** @type {OcularConfig} */
let ocularConfig = {
  typescript: {
    project: 'tsconfig.build.json'
  },

  babel: false,

  lint: {
    paths: ['modules']
  },

  aliases: {
    test: resolve('./test')
  },

  entry: {
    test: 'test/node.ts',
    'test-browser': 'test/index.html',
    size: 'test/size/import-nothing.js'
  }
};

export default ocularConfig;
