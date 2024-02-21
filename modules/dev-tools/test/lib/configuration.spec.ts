import test from 'tape-promise/tape';
// @ts-expect-error Aliased import
import {getBabelConfig, getESLintConfig, getPrettierConfig} from 'ocular-dev-tools/configuration';

test('dev-tools#getConfig', (t) => {
  const mockBabelApi = {cache: {using: () => {}}, env: (env) => env};

  let config = getESLintConfig();
  t.equals(typeof config, 'object');

  config = getPrettierConfig();
  t.equals(typeof config, 'object');

  config = getBabelConfig(mockBabelApi);
  t.equals(typeof config, 'function');

  t.end();
});
