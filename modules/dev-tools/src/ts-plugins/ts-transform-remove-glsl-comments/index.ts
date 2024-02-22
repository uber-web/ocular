/**
 * TypeScript transform to remove comments and unnecessary white space from GLSL source.
 * A template string is considered GLSL source if:
   a) the file matches the pattern specified in the plugin config; or
   b) it is tagged as glsl`...`
 * Usage with ts-patch:
   {
      "plugins": [
        {
          "transform": "ocular-dev-tools/ts-transform-remove-glsl-comments",
          "pattern": ["*.glsl.ts"]
        }
      ]
   }
 */
import * as path from 'path';
import type {
  Program,
  TransformationContext,
  SourceFile,
  Node,
  NoSubstitutionTemplateLiteral,
  TemplateLiteralToken
} from 'typescript';
import type {TransformerExtras, PluginConfig} from 'ts-patch';
import minimatch from 'minimatch';

// inline comment is only safe to remove if it's followed by a return (i.e. end of comment)
const INLINE_COMMENT_REGEX = /\s*\/\/.*[\n\r]/g;
const BLOCK_COMMENT_REGEX = /\s*\/\*(\*(?!\/)|[^*])*\*\//g;
const WHITESPACE_REGEX = /\s*[\n\r]\s*/gm;
const DEFAULT_PATTERNS = [];
const COMMENT_TAG = '@shader GLSL';

type RemoveGLSLCommentsPluginConfig = PluginConfig & {
  /** Glob patterns of shader files to include. */
  pattern?: string[];
};

export default function (
  program: Program,
  pluginConfig: RemoveGLSLCommentsPluginConfig,
  {ts}: TransformerExtras
) {
  const {pattern = DEFAULT_PATTERNS} = pluginConfig;

  return (ctx: TransformationContext) => {
    const {factory} = ctx;

    return (sourceFile: SourceFile) => {
      const isShaderFile = matchFilePath(sourceFile.fileName, pattern);

      function replaceShaderString(node: Node): Node {
        if (ts.isNoSubstitutionTemplateLiteral(node)) {
          const text = node.rawText ?? '';
          // Convert source text to string content
          const newText = filterShaderSource(text);
          if (newText === text) {
            return node;
          }
          return factory.createNoSubstitutionTemplateLiteral(newText, newText);
        }
        if (ts.isTemplateLiteralToken(node)) {
          const text = node.rawText ?? '';
          const newText = filterShaderSource(text);
          if (newText === text) {
            return node;
          }
          if (ts.isTemplateHead(node)) {
            return factory.createTemplateHead(newText, newText);
          }
          if (ts.isTemplateMiddle(node)) {
            return factory.createTemplateMiddle(newText, newText);
          }
          if (ts.isTemplateTail(node)) {
            return factory.createTemplateTail(newText, newText);
          }
          return node;
        }
        return ts.visitEachChild(node, replaceShaderString, ctx);
      }

      function visit(node: Node): Node {
        if (
          ts.isTaggedTemplateExpression(node) &&
          // First child is the tag identifier
          node.getChildAt(0).getText() === 'glsl'
        ) {
          return replaceShaderString(node);
        }
        if (isShaderFile && ts.isTemplateLiteral(node)) {
          return replaceShaderString(node);
        }
        return ts.visitEachChild(node, visit, ctx);
      }
      return ts.visitNode(sourceFile, visit);
    };
  };
}

function matchFilePath(filePath: string, includePatterns: string[]): boolean {
  const relPath = path.relative(process.env.PWD ?? '', filePath);
  for (const pattern of includePatterns) {
    if (minimatch(relPath, pattern)) {
      return true;
    }
  }
  return false;
}

function filterShaderSource(source: string): string {
  return source
    .replace(INLINE_COMMENT_REGEX, '\n')
    .replace(BLOCK_COMMENT_REGEX, '')
    .replace(WHITESPACE_REGEX, '\n');
}
