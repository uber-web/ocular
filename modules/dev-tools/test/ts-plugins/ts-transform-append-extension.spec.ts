import test from 'tape-promise/tape';
import {transpile} from './test-transformer.js';
// @ts-expect-error Aliased import, remapped to valid path in esm-loader
import appendExtension from 'ocular-dev-tools/ts-plugins/ts-transform-append-extension';

const input = `\
export type { TypedArray } from "./types";
export { add } from "./math/add";
import vs from "../shaders/vs.glsl";
import { Shader } from "@luma.gl/core";
export { vs, Shader };`;

const testCases = [
  {
    title: 'add default extension to js imports',
    config: {after: true},
    output: `\
export { add } from "./math/add.js";
import vs from "../shaders/vs.glsl";
import { Shader } from "@luma.gl/core";
export { vs, Shader };`
  },
  {
    title: 'add default extension to d.ts imports',
    config: {afterDeclarations: true},
    output: `\
export type { TypedArray } from "./types.js";
export { add } from "./math/add.js";
import vs from "../shaders/vs.glsl";
import { Shader } from "@luma.gl/core";
export { vs, Shader };`
  },
  {
    title: 'add custom extension to js imports',
    config: {after: true, extensions: ['.mjs', '.glsl.mjs']},
    output: `\
export { add } from "./math/add.mjs";
import vs from "../shaders/vs.glsl.mjs";
import { Shader } from "@luma.gl/core";
export { vs, Shader };`
  }
];

test('ts-transform-append-extension', (t) => {
  for (const testCase of testCases) {
    const result = transpile({
      source: input,
      transformer: appendExtension,
      config: testCase.config,
      outputType: testCase.config.afterDeclarations ? 'd.ts' : 'js'
    });

    t.is(result.trim(), testCase.output, testCase.title);
  }

  t.end();
});
