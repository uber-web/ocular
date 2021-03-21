/* eslint-disable max-len */
import test from 'tape-catch';
import {getOcularOptions} from '../../src/utils/get-ocular-options';

const OPTIONS = {PROJECT_NAME: 'test.gl'};
const GOOD_CONFIG = {
  plugins: [
    'gatsby-plugin-random',
    {
      resolve: 'gatsby-plugin-noop',
      options: {doNothingFast: true},
    },
    {
      resolve: 'gatsby-theme-ocular',
      options: OPTIONS,
    },
    'gatsby-plugin-xyz',
  ],
};

test('getOcularOptions', (t) => {
  t.deepEquals(
    getOcularOptions(GOOD_CONFIG),
    OPTIONS,
    "Returns ocular's options from a mix of plugins in a gatsby config"
  );

  t.end();
});
