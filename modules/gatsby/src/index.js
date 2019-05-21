module.exports.getGatsbyNodeCallbacks = require('./gatsby-node');

module.exports.getGatsbyConfig = require('./gatsby-config/get-gatsby-config');

// UTILS
const {log, COLOR} = require('./utils/log');

module.exports.log = log;
module.exports.log = COLOR;

// IN PROGRESS - AUTOMATIC EXAMPLE LIST DETECTION
const {getExamples, getHeroExample} = require('./utils/example-registry');

module.exports.getExamples = getExamples;
module.exports.getHeroExample = getHeroExample;

// DEPRECATED/REMOVED (Export stubs that emit deprecation messages)

const {
  registerReactComponent,
  registerDefaultReactComponent,
  getReactComponent
} = require('./utils/example-registry');

module.exports.registerReactComponent = registerReactComponent;
module.exports.registerDefaultReactComponent = registerDefaultReactComponent;
module.exports.getReactComponent = getReactComponent;
