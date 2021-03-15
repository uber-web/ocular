import test from 'tape-promise/tape';
import {shallowMerge} from '../../src/utils/utils';

test('dev-tools#utils', (t) => {
  t.equals(typeof shallowMerge, 'function');

  t.end();
});
