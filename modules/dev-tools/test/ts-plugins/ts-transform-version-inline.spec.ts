import test from 'tape-promise/tape';
import {transpile, assertSourceEqual} from './test-transformer.js';
// @ts-expect-error Aliased import, remapped to valid path in esm-loader
import versionInline from 'ocular-dev-tools/ts-plugins/ts-transform-version-inline';

const testCases = [
  {
    title: 'default identifier replaced',
    config: {},
    input: 'const version: string = __VERSION__;',
    output: 'const version = "0.0.0";'
  },
  {
    title: 'no matching identifier',
    config: {},
    input: 'const version: string = deck.__VERSION__;',
    output: 'const version = deck.__VERSION__;'
  },
  {
    title: 'custom identifier replaced',
    config: {identifier: '__package_version'},
    input: 'const version: string = __package_version;',
    output: 'const version = "0.0.0";'
  }
];

test('ts-transform-version-inline', (t) => {
  for (const testCase of testCases) {
    const result = transpile({
      source: testCase.input,
      transformer: versionInline,
      config: testCase.config
    });

    t.is(assertSourceEqual(result, testCase.output), true, testCase.title);
  }

  t.end();
});
