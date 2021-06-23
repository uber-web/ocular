// export type WebpackConfigOptions = {
//   webpackVersion?: number;
// }

/**
 * Returns a default webpack configuration object
 * @param env this is a webpack parameter that should just be passed through
 * @param options application options controlling the generated configuration
 */
export function getWebpackConfig(env?: {[key: string]: any}, options?: {}): {[key: string]: any};
