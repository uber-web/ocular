// NOTE: It is possible to override the ocular-provided callbacks
// and this take control any aspect of gatsby:

const ocularConfig = require('./ocular-config');
const getGatsbyNodeCallbacks = require('ocular-gatsby/gatsby-node');

const callbacks = getGatsbyNodeCallbacks(ocularConfig);

Object.assign(module.exports, callbacks);
