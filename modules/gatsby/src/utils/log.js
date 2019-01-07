const {Log, COLOR} = require('probe.gl');

const log = new Log({id: 'ocular'}).enable();

log.log({color: COLOR.CYAN}, 'Loading ocular website generator (gatsby version)')();

module.exports.log = log;
module.exports.COLOR = COLOR;
