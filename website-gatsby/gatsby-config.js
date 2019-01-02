const {getGatsbyConfig, setSiteConfig, registerReactComponent} = require('ocular');

const config = require('./ocular-config');

setSiteConfig(config);

module.exports = getGatsbyConfig(config);

