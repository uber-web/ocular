/**
 * Support module alias in ESM mode
 * tsconfig-paths does not work in ESM, see https://github.com/dividab/tsconfig-paths/issues/122
 * Adapted from https://github.com/TypeStrong/ts-node/discussions/1450
 */
import {pathToFileURL} from 'url';
import {resolve as resolveTs, getFormat, transformSource, load} from 'ts-node/esm';
import {getValidPath} from '../utils/utils.js';
import paths from '../../.alias.json' assert {type: 'json'};

export {getFormat, transformSource, load};

const matchPath = createMatchPath(paths);

export function resolve(specifier, context, defaultResolver) {
  const mappedSpecifier = matchPath(specifier);
  if (mappedSpecifier) {
    if (mappedSpecifier.match(/(\/\*|\.jsx?|\.tsx?|\.cjs)$/)) {
      specifier = pathToFileURL(mappedSpecifier).pathname;
    } else {
      specifier = `${pathToFileURL(mappedSpecifier)}.ts`;
    }
  }
  const result = resolveTs(specifier, context, defaultResolver);
  return result;
}

/** Convert ocular alias object to TS config paths object */
function createMatchPath(aliases) {
  const tests = [];

  for (const key in aliases) {
    const alias = aliases[key];
    let testFunc;
    if (key.includes('*')) {
      const regex = new RegExp(`^${key.replace('*', '(.+)')}`);
      testFunc = (specifier) => {
        const match = specifier.match(regex);
        if (match) {
          return specifier.replace(match[0], alias.replace('*', match[1]));
        }
        return null;
      };
    } else {
      let defaultEntry = alias;

      if (!alias.match(/(\/\*|\.jsx?|\.tsx?|\.cjs)$/)) {
        defaultEntry = getValidPath(`${alias}/index.ts`, `${alias}/index.js`) || defaultEntry;
      }

      testFunc = (specifier) => {
        if (key === specifier) {
          return defaultEntry;
        }
        if (specifier.startsWith(`${key}/`)) {
          return `${alias}${specifier.slice(key.length)}`;
        }
        return null;
      };
    }
    tests.push(testFunc);
  }

  return (specifier) => {
    for (const test of tests) {
      const result = test(specifier);
      if (result) {
        return result;
      }
    }
    return null;
  };
}
