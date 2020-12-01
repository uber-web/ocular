module.exports.getGatsbyNodeCallbacks = require('./gatsby-node');

var _require = require('./utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

module.exports.log = log;
module.exports.COLOR = COLOR;
module.exports.validateConfig = require('./utils/validate-config');
module.exports.CONFIG_SCHEMA = require('./gatsby-config/config-schema');
//# sourceMappingURL=index.js.map