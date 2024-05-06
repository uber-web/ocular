/**
 * TypeScript transform to replaces `gl.<constant>` or `GL.<constant>` references with 
 * the corresponding WebGL constant value. Requires `@luma.gl/constants` as peer dependency.
 * Usage with ts-patch:
   {
      "plugins": [
        {
          "transform": "ocular-dev-tools/ts-transform-inline-webgl-constants"
        }
      ]
   }
 */
import type {Program, TransformationContext, SourceFile, Node} from 'typescript';
import type {TransformerExtras, PluginConfig} from 'ts-patch';
import {GL} from '@luma.gl/constants';

export default function (program: Program, pluginConfig: PluginConfig, {ts}: TransformerExtras) {
  return (ctx: TransformationContext) => {
    const {factory} = ctx;

    function filterLeftIdentifier(node: Node): boolean {
      const left = node.getChildAt(0);
      return ts.isIdentifier(left) && (left.text === 'GL' || left.text === 'gl');
    }

    return (sourceFile: SourceFile) => {
      function visit(node: Node): Node {
        if (ts.isPropertyAccessExpression(node) && filterLeftIdentifier(node)) {
          const key = node.getChildAt(2);
          if (ts.isIdentifier(key) && key.text in GL) {
            return factory.createNumericLiteral(GL[key.text]);
          }
        }
        if (ts.isElementAccessExpression(node) && filterLeftIdentifier(node)) {
          const key = node.getChildAt(2);
          if (ts.isStringLiteral(key) && key.text in GL) {
            return factory.createNumericLiteral(GL[key.text]);
          }
        }
        return ts.visitEachChild(node, visit, ctx);
      }
      return ts.visitNode(sourceFile, visit);
    };
  };
}
