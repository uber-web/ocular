/** Helper type to typecheck ocular config in applications */
type OcularConfig = {
  root?: string;

  aliases?: {[module: string]: string};

  babel?: {
    configPath?: string;
    extensions?: string[];
  };

  lint?: {
    paths?: string[];
    extensions?: string[];
  };

  vite?: {
    version?: number;
    configPath?: string;
  };

  browserTest?: {
    server?: string;
    browser?: string;
  };

  entry?: {
    test?: string;
    'test-browser'?: string;
    bench?: string;
    'bench-browser'?: string;
    size?: string[];
  };
};

/** Internal type to typecheck resolved ocular config inside ocular-dev-tools */
type MaterializedOcularConfig = {
  root: string;

  aliases: {[module: string]: string};

  babel: {
    configPath: string;
    extensions: string[];
  };

  lint: {
    paths: string[];
    extensions: string[];
  };

  vite: {
    version: number;
    configPath: string;
  };

  browserTest?: {
    server?: string;
    browser?: string;
  };

  entry: {
    test: string;
    'test-browser': string;
    bench: string;
    'bench-browser': string;
    size: string[];
  };
};

/**
 * Returns a default ocular config object
 * @param options.root - path to package root, default `pwd`
 * @param options.aliasMode - default `src`
 */
export function getOcularConfig(options?: {
  root?: string;
  aliasMode?: string;
}): MaterializedOcularConfig;
