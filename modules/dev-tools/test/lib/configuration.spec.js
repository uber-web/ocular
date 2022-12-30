import test from 'tape-promise/tape';
import {
  getBabelConfig,
  getESLintConfig,
  getPrettierConfig
} from '../../src/configuration/index.cjs';

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
