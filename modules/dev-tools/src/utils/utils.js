import fs from 'fs';

export function shallowMerge(base, override) {
  for (const key in override) {
    if (base[key] && typeof base[key] === 'object') {
      Object.assign(base[key], override[key]);
    } else {
      base[key] = override[key];
    }
  }
  return base;
}

export function getValidPath(...resolveOrder) {
  for (const path of resolveOrder) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
  return null;
}
