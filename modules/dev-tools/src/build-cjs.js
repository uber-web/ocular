import esbuild from 'esbuild';
import fs from 'fs/promises';
import {getCJSEntryPoints} from './helpers/get-cjs-entry-points.js';
import {getCJSExportConfig} from './configuration/get-esbuild-config.js';

async function main() {
  for (const fileName of getCJSEntryPoints()) {
    const inputPath = `./dist/${fileName}.js`;
    try {
      await fs.stat(inputPath);

      const esbuildConfig = await getCJSExportConfig({
        input: inputPath,
        output: `dist/${fileName}.cjs`
      });
      const result = await esbuild.build(esbuildConfig);
      if (result.errors.length > 0) {
        process.exit(1);
      }
    } catch {
      // File does not exist
      console.error(`\x1b[33mCannot find file ${inputPath}\x1b[0m`);
    }
  }
}

main();
