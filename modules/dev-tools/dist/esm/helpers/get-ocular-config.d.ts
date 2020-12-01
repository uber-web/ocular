/** Helper type to typecheck ocular config in applications */
type OcularConfig = {
  babel?: {
    configPath?: string;
    extensions?: string[];
  },

  lint?: {
    paths?: string[],
    extensions?: string[];
  },

  aliases?: {[module: string]: string},

  entry?: {
    test?: string;
    'test-browser'?: string;
    bench?: string;
    'bench-browser'?: string;
    size?: string;
  };

  webpack?: {
    version?: number;
    configPath?: string;
  };
}

/** Internal type to typecheck resolved ocular config inside ocular-dev-tools */
type MaterializedOcularConfig = {
  babel: {
    configPath: string;
    extensions: string[];
  },

  lint: {
    paths: string[],
    extensions: string[];
  },

  aliases: {[module: string]: string},

  entry: {
    test: string;
    'test-browser': string;
    bench: string;
    'bench-browser': string;
    size: string;
  };

  webpack?: {
    version?: number;
    configPath?: string;
  };
}

/**
 * Returns a default ocular config object
 * @param options.root - path to package root, default `pwd`
 * @param options.aliasMode - default `src`
 */
 export function getOcularConfig(options?: {
  root?: string;
  aliasMode?: string;
}): MaterializedOcularConfig;
