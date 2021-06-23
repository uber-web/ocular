/**
 * Returns a default eslint config
 * @param options.react - to enable React linting, supply a string specifying your React version, e.g. "16.8.2"
 */
export function getESLintConfig(options?: {react?: string}): {[key: string]: any};
