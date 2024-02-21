import esbuild from 'esbuild';
import fs from 'fs/promises';
import {getCJSEntryPoints} from './helpers/get-cjs-entry-points.js';
import {getCJSExportConfig} from './configuration/get-esbuild-config.js';

async function main() {
  for (const entry of getCJSEntryPoints()) {
    try {
      await fs.stat(entry.inputFile);

      const esbuildConfig = await getCJSExportConfig({
        input: entry.inputFile,
        output: entry.outputFile
      });
      const result = await esbuild.build(esbuildConfig);
      if (result.errors.length > 0) {
        process.exit(1);
      }
    } catch {
      // File does not exist
      console.error(`\x1b[33mCannot find file ${entry.inputFile}\x1b[0m`);
    }
  }
}

main();
