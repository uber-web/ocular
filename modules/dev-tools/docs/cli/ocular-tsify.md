# ocular-tsify

Combine type declarations with related source files.

## Use

Given a JavaScript file (or list of files) like so:

```bash
npx ocular-tsify ./src/some-file.js
```

Will produce `.ts` files using nearby `.d.ts` files.

## Supported syntax
The script parses `.d.ts` file, collects type declarations and runs typescript parser on `.js` file, injects types wherever a `JSDoc` type declaration is available. It supports most of the common `JSDoc` type declarations.

### 1. Type imports

If importing from matching `.d.ts`, it will inline type declaration:

from

```js
/** @typedef {import('./geo-utils').GeoKey} GeoKey */
```

to

```js
export type GeoKey = {
  id: string,
  label: string,
  dataId: string
};
```

If importing from files other than matching `.d.ts`, will convert to type import.

from

```js
/** @typedef {import('./external-types').GeoState} GeoState */
```

to

```js
import type {GeoState} from './external-types';
```

### 2. Functions

Functions with `JSDoc` type declaration using the `@type {typeof import('./').updater}` will be converted

From

```js
// js
/** @type {typeof import('./reducers').createMapUpdater} */
const createMapUpdater = (state, action) => state

// d.ts
export declare function createMapUpdater(state: State, action: Action<void>): State;
```

To

```js
export function createMapUpdater(state: State, action: Action<void>): State {
   ...
}
```

# Known issues 

Here are some limitations and drawbacks of the scripts

#### 1. Missing empty line inside functions
Typescript compiler [doesn't preserve empty lines](https://github.com/microsoft/TypeScript/issues/843). When ocular-tsify injects types into functions, it will replace the existing JSDoc comment with an empty line, but empty lines inside the functions will be missing. So are empty lines between variable declarations that does not have JSDoc types. More improvements can be made such as insert empty before return statements.

#### 2. Mixed import and export statement

When type declarations are injected, they might come between import statements. Some manual cleanup is required.

#### 3. Unsupported JSDoc `@returns` `@params` tags
Only type declarations with the `@type` tag are supported. Some functions use separate tags such as below, future work can be done to support it.
```js
/**
 * Currently not supported
 * @param {Dataset} dataset
 * @param {GeoKey} geoKey
 * @returns {Array<any>} layers
 */
function defaultLayersForGeoKey(dataset, geoKey) {...}
```
