import test from 'tape-promise/tape';
import {
  getWebpackConfig,
  getBabelConfig,
  getESLintConfig,
  getPrettierConfig
} from 'ocular-dev-tools';

test('dev-tools#getConfig', (t) => {
  const mockBabelApi = {cache: {using: () => {}}, env: (env) => env};
  const mockWebpackEnv = {someWebpackStuff: null};

  let config = getESLintConfig();
  t.equals(typeof config, 'object');

  config = getPrettierConfig();
  t.equals(typeof config, 'object');

  config = getBabelConfig(mockBabelApi);
  t.equals(typeof config, 'object');

  config = getWebpackConfig(mockWebpackEnv);
  t.equals(typeof config, 'object');

  t.end();
});
