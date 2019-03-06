const fs = require('fs');
const {resolve} = require('path');

const IS_MONOREPO = fs.existsSync(resolve('./modules'));

const DEFAULT_CONFIG = {
  babel: {
    plugins: ['version-inline']
  },

  lint: {
    paths: IS_MONOREPO ? ['modules'] : ['src'],
    extensions: ['js', 'md']
  },

  aliases: {},

  entry: {
    'test-node': 'test/node',
    'test-browser': 'test/browser',
    'bench-node': 'test/bench/node',
    'bench-browser': 'test/bench/browser',
    'size': 'test/size'
  }
};

let userConfig;
try {
  userConfig = require(resolve('./ocular.config.js'));
} catch (err) {
  userConfig = {};
}

function shallowMerge(obj1, obj2) {
  const result = {};
  const keys = new Set(Object.keys(obj1).concat(Object.keys(obj2)));

  keys.forEach(key => {
    result[key] = Object.assign({}, obj1[key], obj2[key]);    
  });

  return result;
}

module.exports = shallowMerge(DEFAULT_CONFIG, userConfig);
