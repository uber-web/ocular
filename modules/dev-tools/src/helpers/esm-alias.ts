/**
 * Support module alias in ESM mode by implementing Node.js custom module resolver
 * tsconfig-paths does not work in ESM, see https://github.com/dividab/tsconfig-paths/issues/122
 * Adapted from https://github.com/TypeStrong/ts-node/discussions/1450
 */
import path from 'path';
import fs from 'fs';
import {pathToFileURL} from 'url';
import {getValidPath, ocularRoot} from '../utils/utils.js';

/** Node.js resolve hook,
 * https://nodejs.org/api/module.html#resolvespecifier-context-nextresolve
 */
type ResolveHook = (
  specifier: string,
  context: {
    conditions?: unknown;
    importAssertions?: unknown;
    parentURL: string;
  },
  nextResolve: ResolveHook
) => Promise<{
  url: string;
  format?: 'builtin' | 'commonjs' | 'json' | 'module' | 'wasm';
  shortCircuit?: boolean;
}>;

// Load alias from file
const pathJSON = fs.readFileSync(path.resolve(ocularRoot, '.alias.json'), 'utf-8');
const paths: Record<string, string> = JSON.parse(pathJSON);
const matchPath = createMatchPath(paths);

export const resolve: ResolveHook = (specifier, context, nextResolver) => {
  const mappedSpecifier = matchPath(specifier);
  if (mappedSpecifier) {
    if (mappedSpecifier.match(/(\/\*|\.jsx?|\.tsx?|\.cjs|\.json)$/)) {
      specifier = pathToFileURL(mappedSpecifier).pathname;
    } else if (mappedSpecifier.includes('/dist/')) {
      specifier = `${pathToFileURL(mappedSpecifier)}.js`;
    } else {
      specifier = `${pathToFileURL(mappedSpecifier)}`;
    }
  }
  // @ts-expect-error omitted arguments are populated by Node.js
  return nextResolver(specifier);
};

/** Checks if a path matches aliased pattern.
 * If so, returns mapped path, otherwise returns null
 */
type AliasTest = (specifier: string) => string | null;

/** Get alias mapping function from ocular config */
function createMatchPath(aliases: Record<string, string>): AliasTest {
  const tests: AliasTest[] = [];

  for (const key in aliases) {
    const alias = aliases[key];
    let testFunc: AliasTest;
    if (key.includes('*')) {
      const regex = new RegExp(`^${key.replace('*', '(.+)')}`);
      testFunc = (specifier: string) => {
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

      testFunc = (specifier: string) => {
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

  return (specifier: string) => {
    for (const test of tests) {
      const result = test(specifier);
      if (result) {
        return result;
      }
    }
    return null;
  };
}
