/**
 * TypeScript transform to append file extension to import statements in the compiled JS files
 * Usage with ts-patch:
   {
      "plugins": [
        {
          "transform": "ocular-dev-tools/ts-transform-append-extension",
          "extensions": [".js"],
          "after": true
        }
      ]
   }
 * Adapted from https://github.com/murolem/ts-transformer-append-js-extension to support custom extensions
 */
import * as path from 'path';
import type {Program, TransformationContext, SourceFile, Node} from 'typescript';
import type {TransformerExtras, PluginConfig} from 'ts-patch';

type AppendExtensionPluginConfig = PluginConfig & {
  /** List of file extensions, for example:
   * '.js': applies to paths without an extension, e.g. `import {add} from './math'` => `import {add} from './math.js'`
   * '.lib.cjs': applies to paths ending with .lib, e.g. `import fft from './fft.lib` => `import fft from './fft.lib.cjs'`
   * @default [".js"]
   */
  extensions?: string[];
};

export default function (
  program: Program,
  pluginConfig: AppendExtensionPluginConfig,
  {ts}: TransformerExtras
) {
  // only append .js when module specifier has no extension or user-provided extensions
  const {extensions = ['.js']} = pluginConfig;
  const extMappings = new Map<string, string>();
  for (const ext of extensions) {
    const addition = path.extname(ext) || ext;
    const base = path.basename(ext, addition);
    extMappings.set(base, addition);
  }

  function shouldMutateModuleSpecifier(node: Node): string | false {
    if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) return false;
    if (node.moduleSpecifier === undefined) return false;
    // only when module specifier is valid
    if (!ts.isStringLiteral(node.moduleSpecifier)) return false;
    // only when path is relative
    if (!node.moduleSpecifier.text.startsWith('./') && !node.moduleSpecifier.text.startsWith('../'))
      return false;
    // only when module specifier has accepted extension
    const ext = path.extname(node.moduleSpecifier.text);
    if (!extMappings.has(ext)) return false;
    return node.moduleSpecifier.text + extMappings.get(ext);
  }

  return (ctx: TransformationContext) => {
    const {factory} = ctx;

    return (sourceFile: SourceFile) => {
      function visit(node: Node): Node {
        const newImportSource = shouldMutateModuleSpecifier(node);
        if (newImportSource) {
          if (ts.isImportDeclaration(node)) {
            const newModuleSpecifier = factory.createStringLiteral(newImportSource);
            node = factory.updateImportDeclaration(
              node,
              node.modifiers,
              node.importClause,
              newModuleSpecifier,
              node.assertClause
            );
          } else if (ts.isExportDeclaration(node)) {
            const newModuleSpecifier = factory.createStringLiteral(newImportSource);
            node = factory.updateExportDeclaration(
              node,
              node.modifiers,
              node.isTypeOnly,
              node.exportClause,
              newModuleSpecifier,
              node.assertClause
            );
          }
        }

        return ts.visitEachChild(node, visit, ctx);
      }

      return ts.visitNode(sourceFile, visit);
    };
  };
}
