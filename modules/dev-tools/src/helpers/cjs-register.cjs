/**
 * Support module alias in CJS mode
 */
const tsConfigPaths = require('tsconfig-paths');
// @ts-expect-error
const paths = require('../../.alias.json');

tsConfigPaths.register({
  baseUrl: '.',
  paths: parseModuleAlias(paths)
});

/** Convert ocular alias object to TS config paths object */
function parseModuleAlias(aliases) {
  // Cast user config to tsconfig-style paths
  const result = {};
  for (const key in aliases) {
    const alias = aliases[key];
    result[key] = [alias];
    if (!alias.match(/(\/\*|\.jsx?|\.tsx?|\.cjs)$/)) {
      result[`${key}/*`] = [`${alias}/*`];
    }
  }
  return result;
}
