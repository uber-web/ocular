import test from 'tape-promise/tape';
import {tapeEquals, tapeEqualsEpsilon} from '../test-utils';
import {it, expect} from '../test-utils';

test('tapeEquals', t => {
  tapeEquals(t, 1, 1, 'tapeEquals OK');
  t.end();
});

test('tapeEqualsEpsilon', t => {
  tapeEqualsEpsilon(t, 1, 1 + 1e-12, 1e-10, 'tapeEqualsEpsilon OK');
  t.end();
});

it('it should expect', () => {
  expect(1).toBe(1);
});
