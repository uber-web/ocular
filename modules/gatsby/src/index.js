
module.exports.getGatsbyNodeCallbacks = require('./gatsby-node/get-gatsby-node-callbacks');

module.exports.getGatsbyConfig = require('./gatsby-config/get-gatsby-config');

const {registerReactComponent, getReactComponent, getHeroExample} =
  require('./utils/component-registry');

module.exports.registerReactComponent = registerReactComponent;
module.exports.getReactComponent = getReactComponent;
module.exports.getHeroExample = getHeroExample;

// UTILS
const {log, COLOR} = require('./utils/log');

module.exports.log = log;
module.exports.log = COLOR;
