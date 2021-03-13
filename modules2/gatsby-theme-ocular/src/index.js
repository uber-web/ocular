module.exports.getGatsbyNodeCallbacks = require('./gatsby-node');

// UTILS
const {log, COLOR} = require('./utils/log');

module.exports.log = log;
module.exports.COLOR = COLOR;

module.exports.validateConfig = require('./utils/validate-config');
module.exports.CONFIG_SCHEMA = require('./gatsby-config/config-schema');
