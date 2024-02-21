/**
 * TypeScript transform to inject the current version of the package as string.
 * Usage with ts-patch:
   {
      "plugins": [
        {
          "transform": "ocular-dev-tools/ts-transform-version-inline",
          "identifier": "PACKAGE_VERSION"
        }
      ]
   }
 */
import * as fs from 'fs';
import * as path from 'path';
import type {Program, TransformationContext, SourceFile, Node} from 'typescript';
import type {TransformerExtras, PluginConfig} from 'ts-patch';

type VersionInlinePluginConfig = PluginConfig & {
  /** Identifier name to replace in code.
   * @default "__VERSION__"
   */
  identifier?: string;
};

export default function (
  program: Program,
  pluginConfig: VersionInlinePluginConfig,
  {ts}: TransformerExtras
) {
  const {identifier = '__VERSION__'} = pluginConfig;

  return (ctx: TransformationContext) => {
    const {factory} = ctx;

    return (sourceFile: SourceFile) => {
      let packageVersion: string | null;

      function visit(node: Node): Node {
        if (ts.isIdentifier(node) && node.getText() === identifier) {
          if (packageVersion === undefined) {
            packageVersion = getPackageVersion(sourceFile.fileName);
          }
          if (packageVersion) {
            return factory.createStringLiteral(packageVersion);
          }
        }
        return ts.visitEachChild(node, visit, ctx);
      }
      return ts.visitNode(sourceFile, visit);
    };
  };
}

/**
 * Retrieve the version string from the closest package.json
 */
function getPackageVersion(fileName: string): string | null {
  let currentDir = fileName;
  while (currentDir !== '/') {
    try {
      currentDir = path.dirname(currentDir);
      const packageJson = path.join(currentDir, 'package.json');
      const stat = fs.statSync(packageJson);
      if (stat.isFile()) {
        const content = fs.readFileSync(packageJson, 'utf8');
        return JSON.parse(content).version as string;
      }
    } catch {
      // file does not exist, try going up
    }
  }
  return null;
}
