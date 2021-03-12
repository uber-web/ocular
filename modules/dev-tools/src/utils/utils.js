function shallowMerge(base, override) {
  for (const key in override) {
    if (base[key] && typeof base[key] === 'object') {
      Object.assign(base[key], override[key])
    } else {
      base[key] = override[key];
    }
  }
  return base;
}

module.exports = {
  shallowMerge
};
