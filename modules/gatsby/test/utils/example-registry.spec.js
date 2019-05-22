/* eslint-disable max-len */
import test from 'tape-catch';

import {
  getHeroExample,
  registerReactComponent,
  registerDefaultReactComponent,
  getReactComponent
} from 'ocular-gatsby';

test('ExampleRegistry#Exports', t => {
  t.equals(typeof getHeroExample, 'function', 'getHeroExample is exported');
  t.equals(
    typeof registerReactComponent,
    'function',
    'registerReactComponent is exported'
  );
  t.equals(
    typeof registerDefaultReactComponent,
    'function',
    'registerDefaultReactComponent is exported'
  );
  t.equals(
    typeof getReactComponent,
    'function',
    'getReactComponent is exported'
  );
  t.end();
});
