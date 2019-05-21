const {log} = require('./log');

// TODO
function getExamples() {
  log.warn(
    'getExamples() not implemented. Use ocular-config.js:EXAMPLES[].componentUrl'
  );
  return [];
}

// Get a hero example if provided, or the first of the listed examples
function getHeroExample() {
  const EXAMPLES = getExamples();
  const exampleNames = Object.keys(EXAMPLES);
  let DefaultHeroExample = exampleNames.length && EXAMPLES[0];
  // HACK/ib - Check if this is a dummy example injected to keep graphgl happy
  // Set to null if undefined
  if (!DefaultHeroExample || DefaultHeroExample.title === 'none') {
    DefaultHeroExample = null;
  }

  const HeroExample = DefaultHeroExample;
  if (!HeroExample) {
    console.warn('ocular: No hero example found', EXAMPLES); // eslint-disable-line
  }
  return HeroExample;
}

module.exports.getReactComponent = getExamples;
module.exports.getHeroExample = getHeroExample;

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
