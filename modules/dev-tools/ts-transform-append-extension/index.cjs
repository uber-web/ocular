/**
 * Adapted from https://github.com/murolem/ts-transformer-append-js-extension
 */
const path = require('path');

module.exports = function (program, pluginConfig, { ts }) {
  // only append .js when module specifier has no extension or user-provided extensions
  const {extensions = ['.js']} = pluginConfig;
  const extMappings = new Map();
  for (const ext of extensions) {
    const addition = path.extname(ext) || ext;
    const base = path.basename(ext, addition);
    extMappings.set(base, addition);
  }

  function shouldMutateModuleSpecifier(node) {
    if (!ts.isImportDeclaration(node) && !ts.isExportDeclaration(node)) return false;
    if (node.moduleSpecifier === undefined) return false;
    // only when module specifier is valid
    if (!ts.isStringLiteral(node.moduleSpecifier)) return false;
    // only when path is relative
    if (!node.moduleSpecifier.text.startsWith('./') && !node.moduleSpecifier.text.startsWith('../')) return false;
    // only when module specifier has accepted extension
    const ext = path.extname(node.moduleSpecifier.text);
    if (!extMappings.has(ext)) return false;
    return node.moduleSpecifier.text + extMappings.get(ext);
  }  

  return (ctx) => {
    const { factory } = ctx;
    
    return (sourceFile) => {
      function visit(node) {
        const newImportSource = shouldMutateModuleSpecifier(node);
        if (newImportSource) {
          if (ts.isImportDeclaration(node)) {
            const newModuleSpecifier = factory.createStringLiteral(newImportSource);
            node = factory.updateImportDeclaration(node, node.modifiers, node.importClause, newModuleSpecifier, node.assertClause);
          } else if (ts.isExportDeclaration(node)) {
            const newModuleSpecifier = factory.createStringLiteral(newImportSource);
            node = factory.updateExportDeclaration(node, node.modifiers, node.isTypeOnly, node.exportClause, newModuleSpecifier, node.assertClause);
          }
        }
    
        return ts.visitEachChild(node, visit, ctx);
      }

      return ts.visitNode(sourceFile, visit);
    };
  };
}
