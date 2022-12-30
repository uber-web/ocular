/**
 * Returns a default babel config
 * @param api this is babel parameter that should just be passed through
 * @param options.react Set to `true` to include React presets
 */
export function getBabelConfig(options?: {
  react?: boolean;
  overrides?: any;
  debug?: boolean;
}): (api: any) => {[key: string]: any};
