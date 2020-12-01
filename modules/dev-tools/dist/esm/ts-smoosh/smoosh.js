import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ts = require('typescript');

var fs = require('fs');

var path = require('path');

var log = require('./log');

var prettier = require('prettier');

var prettierConfig = require('../configuration/get-prettier-config')();

var suffix = 'ts';

function smoosh(base) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var smooshedSrc = returnSmooshed(base, options);
  var outputFile = "./".concat(base, ".").concat(suffix);
  fs.writeFileSync(outputFile, smooshedSrc, 'utf8');
  log.logSuccess("Smooshed ".concat(outputFile));
}

var declDoesntExist = {
  typeAliases: [],
  declarations: [],
  imports: []
};

function returnSmooshed(base) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var dtsFile = "".concat(base, ".d.ts");
  var decls = fs.existsSync(dtsFile) ? parseDts(dtsFile) : declDoesntExist;
  var jsFile = "".concat(base, ".js");
  var enrichedJsNode = enrichJs(jsFile, decls);
  var outputFile = "".concat(base, ".").concat(suffix);
  var resultFile = ts.createSourceFile(outputFile, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TSX);
  var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
  });
  var smooshedSrc = printer.printNode(ts.EmitHint.Unspecified, enrichedJsNode, resultFile);
  var cleanedSrc = replaceExportDeclareType(withoutJSDoc(smooshedSrc));
  return options.prettier ? prettier.format(cleanedSrc, _objectSpread(_objectSpread({}, prettierConfig), {}, {
    filepath: jsFile
  })) : cleanedSrc;
}

function parseDts(dtsFile) {
  var parsed = ts.createSourceFile(dtsFile, fs.readFileSync(dtsFile, 'utf8'), ts.ScriptTarget.Latest);
  var typeAliases = [];
  var declarations = {};
  var imports = [];

  var aggregateDecl = function aggregateDecl(statement) {
    var kind = ts.SyntaxKind[statement.kind];

    if (kind === 'TypeAliasDeclaration') {
      declarations[getIdentifierName(statement)] = statement.type;
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
      return statement.declarationList.declarations.map(aggregateDecl);
    }

    if (!kind.endsWith('Declaration')) {
      var message = "Unexpected statement kind \"".concat(kind, "\" in type definition file \"").concat(dtsFile, "\"");
      return console.warn(message);
    }

    declarations[getIdentifierName(statement)] = statement;
  };

  parsed.statements.forEach(aggregateDecl);
  return {
    typeAliases: typeAliases,
    declarations: declarations,
    imports: imports
  };
}

function enrichJs(jsFile, dts) {
  var parsed = ts.createSourceFile(jsFile, fs.readFileSync(jsFile, 'utf8'), ts.ScriptTarget.Latest);

  var findSource = function findSource(node) {
    var typeSource = null;

    if (node.jsDoc) {
      var typeTag = (node.jsDoc[0].tags || []).find(function (tag) {
        return tag.tagName.escapedText === 'type';
      });

      if (typeTag) {
        var fileName = typeTag.typeExpression.type.argument.literal.text;
        var identifier = typeTag.typeExpression.type.qualifier.escapedText;
        var dir = path.dirname(jsFile);
        var fullPath = path.resolve(dir, "".concat(fileName, ".d.ts"));
        var importedDts = parseDts(fullPath);
        var importedType = importedDts.declarations[identifier];

        if (!importedType) {
          console.warn("Could not find ".concat(identifier, " in ").concat(fullPath, " while trying to smoosh ").concat(jsFile));
          return node;
        }

        typeSource = importedType;
      }
    }

    if (!typeSource) {
      typeSource = dts.declarations[getIdentifierName(node)];
    }

    return typeSource;
  };

  var transformer = function transformer(context) {
    var importsToFind = [];
    return function (rootNode) {
      function visit(node) {
        var kind = ts.SyntaxKind[node.kind];
        importsToFind = importsToFind.concat((node.jsDoc || []).flatMap(function (d) {
          return (d.tags || []).filter(function (tag) {
            return tag.tagName.escapedText === 'typedef';
          });
        }).flatMap(function (typeTag) {
          var fileName = typeTag.typeExpression.type.argument.literal.text;
          var identifier = typeTag.typeExpression.type.qualifier.escapedText;

          if (path.resolve(jsFile) === path.resolve("".concat(path.join(path.dirname(jsFile), fileName), ".js'"))) {
            return [];
          }

          return [{
            fileName: fileName,
            identifier: identifier
          }];
        }));

        if (kind.endsWith('Declaration')) {
          if (kind === 'FunctionDeclaration') {
            var typeSource = findSource(node);
            delete node.jsDoc;

            if (typeSource) {
              return ts.factory.updateFunctionDeclaration(node, node.decorators, node.modifiers, node.asteriskToken, node.name, typeSource.typeParameters, node.parameters.map(function (p, i) {
                return ts.factory.updateParameterDeclaration(p, p.decorators, p.modifiers, p.dotDotDotToken, p.name, p.questionToken, cloneType(typeSource.parameters[i]), p.initializer);
              }), cloneType(typeSource), node.body);
            }

            return node;
          } else if (kind === 'VariableDeclaration') {
            var _typeSource = findSource(node);

            if (_typeSource) {
              if (ts.SyntaxKind[_typeSource.kind] === 'FunctionDeclaration' && ts.SyntaxKind[node.initializer.kind] === 'ArrowFunction') {
                return ts.factory.updateVariableDeclaration(node, node.name, node.exclamationToken, node.type, ts.factory.updateArrowFunction(node.initializer, node.initializer.modifiers, _typeSource.typeParameters, node.initializer.parameters.map(function (p, i) {
                  return ts.factory.updateParameterDeclaration(p, p.decorators, p.modifiers, p.dotDotDotToken, p.name, p.questionToken, cloneType(_typeSource.parameters[i]), p.initializer);
                }), cloneType(_typeSource), node.initializer.equalsGreaterThanToken, node.initializer.body));
              }

              return ts.factory.updateVariableDeclaration(node, node.name, node.exclamationToken, _typeSource.type, node.initializer);
            }

            return node;
          }

          return node;
        }

        return ts.visitEachChild(node, visit, context);
      }

      var newRoot = ts.visitNode(rootNode, visit);
      var importsForTypes = importsToFind.map(function (_ref) {
        var identifier = _ref.identifier,
            fileName = _ref.fileName;
        return ts.factory.createImportDeclaration(undefined, undefined, ts.factory.createImportClause(true, undefined, ts.factory.createNamedImports([ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier(identifier))])), ts.factory.createStringLiteral(fileName));
      });
      return ts.factory.updateSourceFile(newRoot, [].concat(_toConsumableArray(dts.imports), _toConsumableArray(importsForTypes), _toConsumableArray(dts.typeAliases), _toConsumableArray(newRoot.statements)));
    };
  };

  return ts.transform(parsed, [transformer]).transformed[0];
}

function cloneType(node) {
  if (!node.type) {
    console.log(node);
  }

  return node.type && node.type.typeName ? ts.factory.createTypeReferenceNode(node.type.typeName.escapedText) : node.type;
}

function getIdentifierName(node) {
  return node.name.escapedText;
}

var RE = /^[ ]*\/?\*?\*?[ ]*\@(type|typedef)(.*)$/gm;

function withoutJSDoc(text) {
  return text.replace(RE, '');
}

function replaceExportDeclareType(text) {
  var reT = /^export declare type /gm;
  var reI = /^export declare interface /gm;
  return text.replace(reT, 'export type ').replace(reI, 'export interface ');
}

module.exports = {
  smoosh: smoosh,
  returnSmooshed: returnSmooshed
};
//# sourceMappingURL=smoosh.js.map