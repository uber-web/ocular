## TS Smoosh

Combine type decls with related source files.

# Use

Given a JavaScript file (or list of files) like so:

```
$ node ts-smoosh/bin ./src/some-file.js
```

Will produce `.ts` files using nearby `.d.ts` files.

# Supported syntax
ts-smoosh parses `.d.ts` file, collects type declarations and runs typescript parser on `.js` file, injects types wherever a `JsDoc` type declaration is available. It supports most of the common `JSDoc` type declarations we use.

### 1. Type imports

If importing from matching .d.ts, will inline type declaration:

from

```js
/** @typedef {import('./geokey-reducers').GeoKey} GeoKey */
```

to

```js
export type GeoKey = {
  id: string,
  label: string,
  dataId: string
};
```

If importing from files other than matching .d.ts, will convert to type import.

from

```js
/** @typedef {import('./kepler-types').VisState} VisState */
```

to

```js
import type {VisState} from './kepler-types';
```

### 2. Functions

Functions with `JSDoc` type declaration using the `@type {typeof import('./').updater}` will be converted

From

```js
// js
/** @type {typeof import('./project-reducers').createMapUpdater} */
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

# Running Tests

```
$ node test
```

Test cases live in various directories in `./tests`. Tests run by comparing the output against golden master `.tsx` files. To update the masters, run `node ts-smoosh/bin ./test/0X-dir/somefile.js`.

# Known issues 

Here are some limitations and drawbacks of the scripts

#### 1. Missing empty line inside functions
Typescript compiler [doesn't preserve empty lines](https://github.com/microsoft/TypeScript/issues/843). When ts-smoosh injects types into functions, it will replace the existing JSDoc comment with an empty line, but empty lines inside the functions will be missing. So are empty lines between variable declarations that does not have JSDoc types. More improvements can be made such as insert empty before return statements.

#### 2. Mixed import and export statement.

When type decl are injected, they might come between import statements. Some manual cleanup is required.

#### 3. Unsupported JSDoc `@returns` `@params` tags
Only type declarations with the `@type` tag are supported. Some functions use separate tags such as below, future work can be done to support it.
```js
/**
 * Currently not supported
 * @param {KeplerDataset} dataset
 * @param {GeoKey} geoKey
 * @returns {Array<any>} layers
 */
function defaultLayersForGeoKey(dataset, geoKey) {...}
```



# Notes

Here are articles and docs that were helpful when writing this script.

- [Using the Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [Blog post about using TS's parser directly](https://medium.com/allenhwkim/how-to-parse-typescript-from-source-643387971f4e)
- [TypeScript compiler APIs revisited](https://blog.scottlogic.com/2017/05/02/typescript-compiler-api-revisited.html)
- [Dealing with Comment Nodes in the TypeScript Compiler API](https://quramy.medium.com/manipulate-comments-with-typescript-api-73d5f1d43d7f)
- [TypeScript API Playground on Glitch](https://typescript-api-playground.glitch.me/#example=Transformation%203)
