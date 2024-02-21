import {Project, ts} from 'ts-morph';
import type {PluginConfig} from 'ts-patch';

/**
 * Transpile ts code with TypeScript compiler API
 */
export function transpile({
  source,
  transformer,
  config = {},
  outputType = 'js'
}: {
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

  project.createSourceFile('test.ts', source);

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
