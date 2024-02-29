import test from 'tape-promise/tape';
import {transpile, assertSourceEqual} from './test-transformer.js';
// @ts-expect-error Aliased import, remapped to valid path in esm-loader
import inlineConstants from 'ocular-dev-tools/ts-plugins/ts-transform-inline-webgl-constants';

const testCases = [
  {
    title: 'drop GL import',
    input: `\
device.setParametersWebGL({
  blendFunc: [GL.ONE, GL.ONE_MINUS_DST_COLOR, GL.SRC_ALPHA, GL.DST_ALPHA]
});
`,
    output: `\
device.setParametersWebGL({
  blendFunc: [1, 775, 770, 772]
});
`
  },
  {
    title: 'gl constants replaced',
    input: `gl.getParameter(gl.CULL_FACE_MODE);`,
    output: `gl.getParameter(2885);`
  },
  {
    title: 'static property replaced',
    input: `console.log(GL['TRIANGLES']);`,
    output: `console.log(4);`
  },
  {
    title: 'dynamic property not replaced',
    input: `\
const name = 'TRIANGLES';
console.log(GL[name]);
`,
    output: `\
const name = 'TRIANGLES';
console.log(GL[name]);
`
  }
];

test('ts-transform-inline-webgl-constants', (t) => {
  for (const testCase of testCases) {
    const result = transpile({
      source: testCase.input,
      transformer: inlineConstants,
      config: {}
    });

    t.is(assertSourceEqual(result, testCase.output), true, testCase.title);
  }

  t.end();
});
