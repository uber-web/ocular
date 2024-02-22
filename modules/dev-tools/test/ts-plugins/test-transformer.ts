import {Project, ts} from 'ts-morph';
import type {PluginConfig} from 'ts-patch';

/**
 * Transpile ts code with TypeScript compiler API
 */
export function transpile({
  sourceFileName = 'test.ts',
  source,
  transformer,
  config = {},
  outputType = 'js'
}: {
  sourceFileName?: string;
  source: string;
  transformer: Function;
  config?: PluginConfig;
  outputType?: 'js' | 'd.ts';
}): string {
  const dts = outputType === 'd.ts';

  const project = new Project({
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      declaration: dts
    }
  });

  project.createSourceFile(sourceFileName, source);

  const customTransformers: ts.CustomTransformers = {};
  const transform: ts.TransformerFactory<ts.SourceFile> = transformer(
    project.getProgram(),
    config,
    {ts}
  );
  if (config.after) {
    customTransformers.after = [transform];
  } else if (config.afterDeclarations) {
    // @ts-ignore
    customTransformers.afterDeclarations = [transform];
  } else {
    customTransformers.before = [transform];
  }

  const result = project.emitToMemory({
    customTransformers,
    emitOnlyDtsFiles: dts
  });

  return result.getFiles()[0].text;
}

/**
 * Compare two pieces of source code. Returns a description of the difference, or null if identical.
 */
export function assertSourceEqual(
  actual: string,
  expected: string,
  options: {
    /** If true, ignore difference in indent
     * @default true
     */
    ignoreIndent?: boolean;
    /** If true, ignore empty lines
     * @default true
     */
    ignoreEmptyLines?: boolean;
  } = {}
): true | Error {
  const {ignoreIndent = true, ignoreEmptyLines = true} = options;
  const actualLines = actual.split('\n');
  const expectedLines = expected.split('\n');
  let i1 = 0;
  let i2 = 0;

  while (i1 < actualLines.length || i2 < expectedLines.length) {
    let t1 = actualLines[i1] ?? '';
    let t2 = expectedLines[i2] ?? '';
    if (ignoreIndent) {
      t1 = t1.trimStart();
      t2 = t2.trimStart();
    }
    if (t1 === t2) {
      i1++;
      i2++;
    } else if (ignoreEmptyLines && !t1) {
      i1++;
    } else if (ignoreEmptyLines && !t2) {
      i2++;
    } else {
      return new Error(`Mismatch at line ${i1}
    Actual: ${t1}
  Expected: ${t2}
      `);
    }
  }
  return true;
}
