import {Taro} from './b'; // TYPE IMPORTS
import type {Foo} from './a';
import type {Blue} from './b';
export type Foo = Taro[];
import {x} from './z';
// TYPE IMPORTS

/**
 * set join display property

 */
export function convert(a: Taro): string {
  return String(a);
}
