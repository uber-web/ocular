import fs from 'fs';
import {resolve, dirname} from 'path';
import {fileURLToPath} from 'node:url';
import {execSync} from 'child_process';

export function execShellCommand(command: string, args: string[] = []) {
  try {
    execSync(`${command} ${args.join(' ')}`, {
      stdio: 'inherit'
    });
  } catch (err: unknown) {
    process.exit((err as any).status);
  }
}

/** Returns the path to the root directory of ocular-dev-tools */
export const ocularRoot: string = (function () {
  let dir;
  try {
    dir = __dirname;
  } catch {
    dir = dirname(fileURLToPath(import.meta.url));
  }
  return resolve(dir, '../..');
})();

export function shallowMerge<T>(base: T, override: any): T {
  for (const key in override) {
    if (base[key] && typeof base[key] === 'object') {
      Object.assign(base[key], override[key]);
    } else {
      base[key] = override[key];
    }
  }
  return base;
}

/** Given a list of paths, return the first one that exists */
export function getValidPath(...resolveOrder: string[]): string | null {
  for (const path of resolveOrder) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
  return null;
}
