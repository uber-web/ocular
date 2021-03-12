/**
 * Returns a default babel config
 * @param api babel parameter, to be passed through
 */
export function getBabelConfig(
  api,
  options?: {
    react?: boolean;
  }
): {[key: string]: any};
