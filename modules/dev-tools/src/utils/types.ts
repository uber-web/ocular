// https://docs.npmjs.com/cli/v10/configuring-npm/package-json
// Only relevant fields are typed
export type PackageJson = {
  name: string;
  version: string;
  type?: 'module' | 'commonjs';
  main?: string;
  module?: string;
  exports?: {
    [path: string]: string | {import?: string; require?: string; type?: string; default?: string};
  };
  dependencies?: {[name: string]: string};
  devDependencies?: {[name: string]: string};
  peerDependencies?: {[name: string]: string};
  [key: string]: unknown;
};
