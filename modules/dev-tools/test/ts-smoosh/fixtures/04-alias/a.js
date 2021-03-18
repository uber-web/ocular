import {x} from './z';

// TYPE IMPORTS
/** @typedef {import('./a').Foo} Foo */
/** @typedef {import('./b').Blue} Blue */

/**
 * set join display property
 * @type {typeof import('./a').convert}
 */
export function convert(a) {
  return String(a);
}
