import _typeof from "@babel/runtime/helpers/esm/typeof";

function shallowMerge(base, override) {
  for (var key in override) {
    if (base[key] && _typeof(base[key]) === 'object') {
      Object.assign(base[key], override[key]);
    } else {
      base[key] = override[key];
    }
  }

  return base;
}

module.exports = {
  shallowMerge: shallowMerge
};
//# sourceMappingURL=utils.js.map