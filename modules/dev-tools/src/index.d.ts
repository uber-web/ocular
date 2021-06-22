// Ocular Configuration
export type {OcularConfig} from './helpers/get-ocular-config'
export {getOcularConfig} from './helpers/get-ocular-config';

// JS Tool Configurations
export {getESLintConfig} from './configuration/get-eslint-config';
export {getPrettierConfig} from './configuration/get-prettier-config';
export {getBabelConfig} from './configuration/get-babel-config';
export {getWebpackConfig} from './configuration/get-webpack-config';

// Helpers

/**
 * Deeply extend a configuration object, handles objects and arrays
 * @param defaultConfig ocular generated base config
 * @param overrideConfig partial config object with overrides
 */
export function deepMerge<Config>(defaultConfig: Config, overrideConfig: Config): Config;
