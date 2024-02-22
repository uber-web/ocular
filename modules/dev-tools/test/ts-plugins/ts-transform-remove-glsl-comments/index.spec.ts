import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'node:url';

import test from 'tape-promise/tape';
import {transpile, assertSourceEqual} from '../test-transformer.js';
// @ts-expect-error Aliased import, remapped to valid path in esm-loader
import removeGLSLComments from 'ocular-dev-tools/ts-plugins/ts-transform-remove-glsl-comments';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadSourceFromFile(fileName: string): string {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8');
}

const testCases = [
  {
    title: 'no comments',
    fileName: 'test.glsl.ts',
    config: {pattern: ['**/*.glsl.ts']},
    input: 'test-case-0.ts',
    output: 'test-case-0-expected.ts'
  },
  {
    title: 'remove comments from template literal',
    fileName: 'test.glsl.ts',
    config: {pattern: ['**/*.glsl.ts']},
    input: 'test-case-1.ts',
    output: 'test-case-1-expected.ts'
  },
  {
    title: 'excluded by file name',
    fileName: 'test.ts',
    config: {},
    input: 'test-case-1.ts',
    output: 'test-case-1.ts'
  },
  {
    title: 'included by template tag',
    fileName: 'test.ts',
    config: {},
    input: 'test-case-2.ts',
    output: 'test-case-2-expected.ts'
  }
];

test('ts-transform-remove-glsl-comments', (t) => {
  for (const testCase of testCases) {
    const result = transpile({
      sourceFileName: testCase.fileName,
      source: loadSourceFromFile(testCase.input),
      transformer: removeGLSLComments,
      config: testCase.config
    });
    const expected = loadSourceFromFile(testCase.output);

    t.is(assertSourceEqual(result, expected, {ignoreEmptyLines: false}), true, testCase.title);
  }

  t.end();
});
