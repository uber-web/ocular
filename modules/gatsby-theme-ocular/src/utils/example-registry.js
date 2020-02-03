const {log} = require('./log');

// TODO
function getExamples() {
  log.warn(
    'getExamples() not implemented. Use ocular-config.js:EXAMPLES[].componentUrl'
  );
  return [];
}

module.exports.getReactComponent = getExamples;

// REMOVED

function registerReactComponent() {
  log.removed(
    'registerReactComponent',
    'Use ocular-config.js:EXAMPLES[].componentUrl'
  );
}

function registerDefaultReactComponent() {
  log.removed(
    'registerDefaultReactComponent',
    'Use ocular-config.js:EXAMPLES[].componentUrl'
  );
}

function getReactComponent() {
  log.removed(
    'registerReactComponent',
    'Use ocular-config.js:EXAMPLES[].componentUrl'
  );
}

module.exports.registerReactComponent = registerReactComponent;
module.exports.registerDefaultReactComponent = registerDefaultReactComponent;
module.exports.getReactComponent = getReactComponent;
