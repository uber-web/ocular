const assert = require('assert');

const registry = {};

function registerReactComponent(name, component) {
  assert(component !== undefined, name);
  registry[name] = component;
}

function getReactComponent(name, defaultComponent) {
  const component = registry[name] || defaultComponent;
  assert(component !== undefined, name);
  return component;
}

// Get a hero example if provided, or the first of the listed examples
function getHeroExample() {
  const EXAMPLES = getReactComponent('EXAMPLES');
  const exampleNames = Object.keys(EXAMPLES);
  let DefaultHeroExample = exampleNames.length && EXAMPLES[0];
  // HACK/ib - Check if this is a dummy example injected to keep graphgl happy
  // Set to null if undefined
  if (!DefaultHeroExample || DefaultHeroExample.title === 'none') {
    DefaultHeroExample = null;
  }

  let HeroExample = getReactComponent('HERO_EXAMPLE', DefaultHeroExample);
  if (!HeroExample) {
    console.warn('ocular: No hero example found', EXAMPLES);
  }
  return HeroExample;
}

module.exports.registerReactComponent = registerReactComponent;
module.exports.registerReactComponent = registerReactComponent;
module.exports.getReactComponent = getReactComponent;
module.exports.getHeroExample = getHeroExample;