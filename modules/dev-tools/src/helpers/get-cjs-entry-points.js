import fs from 'fs';

export function getCJSEntryPoints() {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  if (packageInfo.exports) {
    const result = [];
    for (const key in packageInfo.exports) {
      const entry = packageInfo.exports[key];
      let outputFile;
      if (typeof entry === 'string') {
        outputFile = entry;
      } else if (entry.require) {
        outputFile = entry.require;
      } else if (entry.default) {
        outputFile = entry.default;
      }
      if (outputFile && outputFile.endsWith('.cjs')) {
        let inputFile;

        if (entry.import) {
          inputFile = entry.import;
        } else {
          inputFile = outputFile.replace('.cjs', '.js');
        }
        result.push({inputFile, outputFile});
      }
    }
    return result;
  }

  // Default entry
  return ['index'];
}
