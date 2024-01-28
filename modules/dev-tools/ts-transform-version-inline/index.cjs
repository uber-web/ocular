const fs = require('fs');
const path = require('path');

module.exports = function (program, pluginConfig, { ts }) {
  const {identifier = '__VERSION__'} = pluginConfig;

  return (ctx) => {
    const { factory } = ctx;
    
    return (sourceFile) => {
      let packageVersion = undefined;

      function visit(node) {
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
function getPackageVersion(fileName) {
  let currentDir = fileName;
  while (currentDir !== '/') {
    try {
      currentDir = path.dirname(currentDir);
      const packageJson = path.join(currentDir, 'package.json');
      const stat = fs.statSync(packageJson);
      if (stat.isFile()) {
        const content = fs.readFileSync(packageJson, 'utf8');
        return JSON.parse(content).version;
      }
    } catch {
      // file does not exist, try going up
    }
  }
  return null;
}
