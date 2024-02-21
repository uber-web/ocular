import fs from 'fs';
import {resolve, dirname} from 'path';
import {fileURLToPath} from 'node:url';

export const packageDir = (function () {
  let dir;
  try {
    dir = __dirname;
  } catch (e) {
    dir = dirname(fileURLToPath(import.meta.url));
  }
  return resolve(dir, '..');
})();

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
