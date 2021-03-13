/* eslint-disable max-len */
import test from 'tape-catch';
import {removeURLPathPrefix} from '../../src/utils/links-utils';

const HOME_PATH_DOCS = 'docs';
const HOME_PATH_DOCUMENTATION = 'documentation';

const URL_INPUTS = [
  'docs/path1/path2/path3',
  '/docs/path1/path2/path3',
  '../../docs/path1/path2',
  './docs/path1/path2',
  'docs',
  'documentation/path1/path2/path3',
];

const URL_INPUTS_RESULT = [
  'path1/path2/path3',
  '/path1/path2/path3',
  '../../path1/path2',
  './path1/path2',
  '/',
  'path1/path2/path3',
];

test('gatsby-theme-ocular#removeURLPathPrefix', t => {
  t.deepEquals(
    removeURLPathPrefix(URL_INPUTS[0], HOME_PATH_DOCS),
    URL_INPUTS_RESULT[0]
  );

  t.deepEquals(
    removeURLPathPrefix(URL_INPUTS[1], HOME_PATH_DOCS),
    URL_INPUTS_RESULT[1]
  );

  t.deepEquals(
    removeURLPathPrefix(URL_INPUTS[2], HOME_PATH_DOCS),
    URL_INPUTS_RESULT[2]
  );

  t.deepEquals(
    removeURLPathPrefix(URL_INPUTS[3], HOME_PATH_DOCS),
    URL_INPUTS_RESULT[3]
  );

  t.deepEquals(
    removeURLPathPrefix(URL_INPUTS[4], HOME_PATH_DOCS),
    URL_INPUTS_RESULT[4]
  );

  t.deepEquals(
    removeURLPathPrefix(URL_INPUTS[5], HOME_PATH_DOCUMENTATION),
    URL_INPUTS_RESULT[5]
  );

  t.end();
});
