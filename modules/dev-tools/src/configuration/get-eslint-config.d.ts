/**
 * Returns a default eslint config
 * @param options.react - enable react. String representing react version, e.g. "16.8.2"
 */
export function getESLintConfig(options?: {
  react?: string;
}): {[key: string]: any};
