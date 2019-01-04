const assert = require('assert');

const registry = {};

module.exports.registerReactComponent = function registerReactComponent(name, component) {
  assert(component !== undefined, name);
  registry[name] = component;
}

module.exports.getReactComponent = function getReactComponent(name, defaultComponent) {
  const component = registry[name] || defaultComponent;
  assert(component !== undefined, name);
  return component;
}
