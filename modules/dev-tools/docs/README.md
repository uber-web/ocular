# ocular-dev-tools

Dev tools for vis.gl open source Javascript frameworks

Contains developer targets for building, cleaning, linting, testing and publishing frameworks.

* The testing script has a number of modes, it can run tests on both browser and node, it can run test on src or built distributions etc.
* The linting feature supports both code and markdown, and runs both eslint and prettier.
* Supports both single module repos (all code in src) and monorepos (code in `modules/<module-name>/src`).

Note: flow is not currently integrated into ocular-dev-tools as we restrict its use to React related code bases.

## Covered tools

ocular installs the necessary dependencies and provides working default configurations for

- eslint
- prettier
- ts-node
- vite

Note that this list may grow over time.

## Installation

```bash
yarn add ocular-dev-tools
```

Your `package.json` should looks something like:

```json
  "devDependencies": {
    "ocular-dev-tools": "^2.0.0-alpha"
  }
```

After installing you can set up your build scripts in package.json as follows:

```json
  "scripts": {
    "bootstrap": "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn && ocular-bootstrap",
    "build": "ocular-clean && ocular-build",
    "lint": "ocular-lint",
    "metrics": "ocular-metrics",
    "publish": "ocular-publish",
    "test": "ocular-test"
  },
```

## Usage

### Configuration

To provide maximum control to the user, ocular build scripts use config files in the framework repo. In cases where such files allow for importing other templates, ocular provides exports that can be used, if not it provides a template that the user can copy into the frameworks root directory.

#### .ocularrc.js

A file `.ocularrc.js` can be placed at the root of the package to customize the dev scripts. The config file may export a JSON object that contains the following keys, or a callback function that returns such object:

- `lint`
  + `paths` (Arrray) - directories to include when linting. Default `['modules', 'src']`
  + `extensions` (Array) - file extensions to include when linting. Default `['js', 'md']`
- `babel`
  + `extensions` - List of file extensions (prefixed with `.`) that `babel` will process. Default `['.es6', '.js', '.es', '.jsx', '.mjs']`
- `aliases` (Object) - additional [module aliases](https://www.npmjs.com/package/module-alias) to use in tests. Default {}.
- `entry` (Object) - entry points for tests.
  + `test` (String) - unit test entry point. Can be a `.js` or `.ts` file. Default `./test/index.ts`.
  + `test-browser` (String) - unit test browser entry point. Can be a `.js`, `.ts` or `.html` file.  Default `./test/browser.ts`.
  + `bench` (String) - benchmark entry point. Can be a `.js` or `.ts` file. Default `./test/bench/index.ts`.
  + `bench-browser` (String) - benchmark browser entry point. Can be a `.js`, `.ts` or `.html` file. Default `./test/bench/browser.ts`.
  + `size` (String | String[]) - metrics entry point(s). Can be a `.js` or `.ts` file. Default `./test/size.ts`.
- `browserTest` (Object) - options for browser tests. Passed to [BrowserTestDriver.run](https://uber-web.github.io/probe.gl/#/documentation/api-reference-testing/browsertestdriver).


#### babel

You may extend the default eslint config with a `.babelrc.js` or `babel.config.js` at the project root:

```js
// .babelrc.js
const {getBabelConfig} = require('ocular-dev-tools/configuration');

module.exports = getBabelConfig({
  react: true,
  // specify custom configs
  overrides: {}
});
```

#### eslint

You may extend the default eslint config with a `.eslintrc.js` or `eslint.config.js` at the project root:

```js
// .eslintrc.js
const {getEslintConfig} = require('ocular-dev-tools/configuration');

module.exports = getEslintConfig({
  react: '18.0',
  // specify custom configs
  overrides: {}
});
```

#### prettier

You may extend the default eslint config with a `.prettier.js` or `prettier.config.js` at the project root:

```js
// .prettier.js
const {getPrettierConfig} = require('ocular-dev-tools/configuration');

module.exports = getPrettierConfig({
  // specify custom configs
  overrides: {}
});
```

#### vite

If `vite.config.js` is found at the root of the package, it is used to bundle units tests and benchmark tests for the browser. Otherwise, a default vite config is used.


## ESM Repo

ocular-dev-tools v2.0 can be used in a ESM repo. When enabled, all imports/exports are handled with Node.js's native [ESM](https://nodejs.org/api/esm.html#introduction) support, instead of being transpiled to commonjs.

To enable ESM mode:

- Add `type: 'module'` to the root `package.json` and each submodule's `package.json`s.
- Add `compilerOptions.module: 'esnext'` to `tsconfig.json`.
- ES5-style `require()` and `module.exports` must be removed from all `.js` files. Some dev dependencies, for example babel and eslint, may not support ESM syntax. In this case, rename the config files to use the `.cjs` extension so that they can be imported successfully.
- When importing directly from a non-TypeScript file, the file extension must be specified. E.g. `import './init'` now becomes `import './init.js'`.
