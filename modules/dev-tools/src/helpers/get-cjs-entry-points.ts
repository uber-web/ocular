import fs from 'fs';
import type {PackageJson} from '../utils/types.js';

export function getCJSEntryPoints(): {
  inputFile: string;
  outputFile: string;
}[] {
  const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8')) as PackageJson;

  if (packageInfo.exports) {
    const result: {
      inputFile: string;
      outputFile: string;
    }[] = [];
    for (const key in packageInfo.exports) {
      const entry = packageInfo.exports[key];
      let outputFile: string = '';
      if (typeof entry === 'string') {
        outputFile = entry;
      } else if (entry.require) {
        outputFile = entry.require;
      } else if (entry.default) {
        outputFile = entry.default;
      }
      if (outputFile && outputFile.endsWith('.cjs')) {
        let inputFile: string;

        if (typeof entry === 'object' && entry.import) {
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
  return [{inputFile: './dist/index.js', outputFile: './dist.index.cjs'}];
}
