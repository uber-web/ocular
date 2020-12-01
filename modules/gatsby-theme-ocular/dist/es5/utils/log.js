"use strict";

var _require = require('probe.gl'),
    Log = _require.Log,
    COLOR = _require.COLOR;

var log = new Log({
  id: 'gatsby-theme-ocular'
}).enable();
log.log({
  color: COLOR.CYAN
}, 'Loading ocular website generator (gatsby version)')();
module.exports.log = log;
module.exports.COLOR = COLOR;
//# sourceMappingURL=log.js.map