const {resolve} = require('path');

const DEFAULT_CONFIG = {
  babel: {
    plugins: ['version-inline']
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

module.exports = {
  babel: Object.assign(DEFAULT_CONFIG.babel, userConfig.aliases),
  aliases: Object.assign(DEFAULT_CONFIG.aliases, userConfig.aliases),
  entry: Object.assign(DEFAULT_CONFIG.entry, userConfig.entry)
};
