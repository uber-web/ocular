module.exports.getGatsbyNodeCallbacks = require('./gatsby-node');

// UTILS
const {log, COLOR} = require('./utils/log');

module.exports.log = log;
module.exports.COLOR = COLOR;

module.exports.validateConfig = require('./utils/validate-config');
module.exports.CONFIG_SCHEMA = require('./gatsby-config/config-schema');

// IN PROGRESS - AUTOMATIC EXAMPLE LIST DETECTION
const {getExamples, getHeroExample} = require('./utils/example-registry');

module.exports.getExamples = getExamples;
module.exports.getHeroExample = getHeroExample;
