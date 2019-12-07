/* eslint-disable no-restricted-syntax */
import test from 'tape-catch';
import {extractMarkdownTitle} from '../../src/utils/parse-markdown';

const TEST_CASES = [
  {markdown: '# normal title\nsome text', title: 'normal title'},
  {markdown: '\n### incorrect title\nsome text', title: 'incorrect title'},
  {markdown: '<!-- test --> \n# commented title\nsome text', title: 'commented title'},
];

test('getOcularOptions', t => {
  for (const {markdown, title} of TEST_CASES) {
    t.deepEquals(
      extractMarkdownTitle(markdown),
      title,
      'The correct title was extracted'
    );
  }
  t.end();
});
