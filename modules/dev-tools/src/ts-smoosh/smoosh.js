const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const log = require('./log');

const prettier = require('prettier');
// @ts-ignore
const {getPrettierConfig} = require('../configuration/get-prettier-config');

const suffix = 'ts';
const prettierConfig = getPrettierConfig();

/**
 * Writes the result of smooshing to a file
 */
function smoosh(base, options = {}) {
  const smooshedSrc = returnSmooshed(base, options);

  const outputFile = `./${base}.${suffix}`;

  fs.writeFileSync(outputFile, smooshedSrc, 'utf8');
  log.logSuccess(`Smooshed ${outputFile}`);
}

const declDoesntExist = {typeAliases: [], declarations: [], imports: []};

function returnSmooshed(base, options = {}) {
  const dtsFile = `${base}.d.ts`;
  // TODO(btford): log a warning here?
  const decls = fs.existsSync(dtsFile) ? parseDts(dtsFile) : declDoesntExist;

  const jsFile = `${base}.js`;
  const enrichedJsNode = enrichJs(jsFile, decls);

  const outputFile = `${base}.${suffix}`;

  const resultFile = ts.createSourceFile(
    outputFile,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TSX
  );

  const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed});

  const smooshedSrc = printer.printNode(ts.EmitHint.Unspecified, enrichedJsNode, resultFile);

  const cleanedSrc = replaceExportDeclareType(withoutJSDoc(smooshedSrc));
  // @ts-ignore
  return options.prettier
    ? prettier.format(cleanedSrc, {...prettierConfig, filepath: jsFile})
    : cleanedSrc;
}

function parseDts(dtsFile) {
  const parsed = ts.createSourceFile(
    dtsFile,
    fs.readFileSync(dtsFile, 'utf8'),
    ts.ScriptTarget.Latest
  );

  // these are going on top
  const typeAliases = [];
  const declarations = {};
  const imports = [];

  const aggregateDecl = (statement) => {
    const kind = ts.SyntaxKind[statement.kind];

    if (kind === 'TypeAliasDeclaration') {
      declarations[getIdentifierName(statement)] = statement.type;
      // console.log(statement && statement.name && statement.name.escapedText)
      typeAliases.push(statement);
      return;
    }
    if (kind === 'InterfaceDeclaration') {
      declarations[getIdentifierName(statement)] = statement;
      typeAliases.push(statement);
      return;
    }
    if (kind === 'ImportDeclaration') {
      imports.push(statement);
      return;
    }

    if (kind === 'FirstStatement') {
      // eslint-disable-next-line consistent-return
      return statement.declarationList.declarations.map(aggregateDecl);
    }

    if (!kind.endsWith('Declaration')) {
      const message = `Unexpected statement kind "${kind}" in type definition file "${dtsFile}"`;
      // eslint-disable-next-line consistent-return
      return console.warn(message);
    }
    declarations[getIdentifierName(statement)] = statement;
  };

  parsed.statements.forEach(aggregateDecl);

  return {typeAliases, declarations, imports};
}

function enrichJs(jsFile, dts) {
  const parsed = ts.createSourceFile(
    jsFile,
    fs.readFileSync(jsFile, 'utf8'),
    ts.ScriptTarget.Latest
  );

  const findSource = (node) => {
    let typeSource = null;

    // First, search for a jsdoc tag with the type, like:
    // @type {typeof import('./b').Noop}
    if (node.jsDoc) {
      const typeTag = (node.jsDoc[0].tags || []).find((tag) => tag.tagName.escapedText === 'type');
      if (typeTag) {
        const fileName = typeTag.typeExpression.type.argument.literal.text;
        const identifier = typeTag.typeExpression.type.qualifier.escapedText;
        const dir = path.dirname(jsFile);
        const fullPath = path.resolve(dir, `${fileName}.d.ts`);
        const importedDts = parseDts(fullPath);
        const importedType = importedDts.declarations[identifier];
        if (!importedType) {
          console.warn(
            `Could not find ${identifier} in ${fullPath} while trying to smoosh ${jsFile}`
          );
          return node;
        }
        typeSource = importedType;
      }
    }

    // Second, use the d.ts file with the same name as this file.
    if (!typeSource) {
      typeSource = dts.declarations[getIdentifierName(node)];
    }

    return typeSource;
  };

  const transformer = (context) => {
    let importsToFind = [];
    return (rootNode) => {
      function visit(node) {
        const kind = ts.SyntaxKind[node.kind];
        importsToFind = importsToFind.concat(
          (node.jsDoc || [])
            .flatMap((d) => (d.tags || []).filter((tag) => tag.tagName.escapedText === 'typedef'))
            .flatMap((typeTag) => {
              const fileName = typeTag.typeExpression.type.argument.literal.text;
              const identifier = typeTag.typeExpression.type.qualifier.escapedText;

              // skip adding imports for js/d.ts pairs. We automatically merge imports
              // for that below.
              if (
                path.resolve(jsFile) ===
                path.resolve(`${path.join(path.dirname(jsFile), fileName)}.js'`)
              ) {
                return [];
              }

              return [{fileName, identifier}];
            })
        );

        //
        if (kind.endsWith('Declaration')) {
          if (kind === 'FunctionDeclaration') {
            const typeSource = findSource(node);
            delete node.jsDoc;
            if (typeSource) {
              return ts.factory.updateFunctionDeclaration(
                node,
                node.decorators,
                node.modifiers,
                node.asteriskToken,
                node.name,
                typeSource.typeParameters,
                node.parameters.map((p, i) =>
                  ts.factory.updateParameterDeclaration(
                    p,
                    p.decorators,
                    p.modifiers,
                    p.dotDotDotToken,
                    p.name,
                    p.questionToken,
                    cloneType(typeSource.parameters[i]),
                    p.initializer
                  )
                ),
                cloneType(typeSource),
                node.body
              );
            }
            return node;
          } else if (kind === 'VariableDeclaration') {
            const typeSource = findSource(node);
            if (typeSource) {
              // Account for the case where the d.ts file is a fn decl,
              // but this file is a variable decl
              // eslint-disable-next-line max-depth
              if (
                ts.SyntaxKind[typeSource.kind] === 'FunctionDeclaration' &&
                ts.SyntaxKind[node.initializer.kind] === 'ArrowFunction'
              ) {
                return ts.factory.updateVariableDeclaration(
                  node,
                  node.name,
                  node.exclamationToken,
                  node.type,
                  ts.factory.updateArrowFunction(
                    node.initializer,
                    node.initializer.modifiers,
                    typeSource.typeParameters,
                    node.initializer.parameters.map((p, i) =>
                      ts.factory.updateParameterDeclaration(
                        p,
                        p.decorators,
                        p.modifiers,
                        p.dotDotDotToken,
                        p.name,
                        p.questionToken,
                        cloneType(typeSource.parameters[i]),
                        p.initializer
                      )
                    ),
                    cloneType(typeSource),
                    node.initializer.equalsGreaterThanToken,
                    node.initializer.body
                  )
                );
              }

              return ts.factory.updateVariableDeclaration(
                node,
                node.name,
                node.exclamationToken,
                typeSource.type,
                node.initializer
              );
            }
            return node;
          }

          return node;
        }

        return ts.visitEachChild(node, visit, context);
      }
      const newRoot = ts.visitNode(rootNode, visit);

      // TODO: should we dedupe/combine these imports?

      const importsForTypes = importsToFind.map(({identifier, fileName}) =>
        ts.factory.createImportDeclaration(
          undefined,
          undefined,
          ts.factory.createImportClause(
            true,
            undefined,
            ts.factory.createNamedImports([
              ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier(identifier))
            ])
          ),
          ts.factory.createStringLiteral(fileName)
        )
      );

      return ts.factory.updateSourceFile(newRoot, [
        ...dts.imports,
        ...importsForTypes,
        ...dts.typeAliases,
        ...newRoot.statements
      ]);
    };
  };

  return ts.transform(parsed, [transformer]).transformed[0];
}

function cloneType(node) {
  if (!node.type) {
    console.log(node);
  }
  return node.type && node.type.typeName
    ? // If the node has a name, we clone it. Referencing the type nodes from the
      // d.ts file directly seems to break code comments.
      ts.factory.createTypeReferenceNode(node.type.typeName.escapedText)
    : // this should be a built-in type (like `string`, `number`, etc.)
      node.type;
}

function getIdentifierName(node) {
  return node.name.escapedText;
}

// Removing JSDoc comments post-hoc with a regex is less-than-ideal, but it does not
// appear that there is a way to update nodes returned from the typescript compiler
// with respect to JSDocs. I see APIs for creating new nodes, but no way to attach em to arbitrary fields.
const RE = /^[ ]*\/?\*?\*?[ ]*\@(type|typedef)(.*)$/gm;
function withoutJSDoc(text) {
  return text.replace(RE, '');
}

// HACK export declare type is not allowed in ts prettier
function replaceExportDeclareType(text) {
  const reT = /^export declare type /gm;
  const reI = /^export declare interface /gm;
  return text.replace(reT, 'export type ').replace(reI, 'export interface ');
}

module.exports = {
  smoosh,
  returnSmooshed
};
