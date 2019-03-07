const fs = require('fs');
const {resolve} = require('path');

const IS_MONOREPO = fs.existsSync(resolve('./modules'));

const DEFAULT_CONFIG = {
  babel: {
    configPath: getValidPath([
      resolve('./babel.config.js'),
      resolve('./babelrc'),
      resolve(__dirname, './babel.config.js')
    ])
  },

  lint: {
    paths: IS_MONOREPO ? ['modules'] : ['src'],
    extensions: ['js', 'md']
  },

  aliases: {},

  entry: {
    'test': 'test/index',
    'test-browser': 'test/browser',
    'bench': 'test/bench/index',
    'bench-browser': 'test/bench/browser',
    'size': 'test/size'
  },

  webpack: {
    configPath: getValidPath([
      resolve('./webpack.config.js'),
      resolve(__dirname, './webpack.config.js')
    ])
  }
};

let userConfig;
try {
  userConfig = require(resolve('./ocular-dev-tools.config.js'));
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

function getValidPath(resolveOrder) {
  return resolveOrder.find(path => fs.existsSync(path));
}

module.exports = shallowMerge(DEFAULT_CONFIG, userConfig);
