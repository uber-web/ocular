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
- babel
- webpack

Note that this list may grow over time.

## Installation

```bash
yarn add ocular-dev-tools reify -D
# optionally enable browser tests
yarn add @probe.gl/test-utils -D
```

Your `package.json` should looks something like:

```json
  "devDependencies": {
    "ocular-dev-tools": "1.0.0-alpha",
    "reify": "^0.18.1",
    "@probe.gl/test-utils": "^3.0.0"
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

#### babel

If `.babelrc.js` or `babel.config.js` is found at the root of the package, it is used to transpile all source code. Otherwise, a default babel config is used.

You may extend the default babel config as follows:

```js
// babelrc.js
const {getBabelConfig, deepMerge} = require('ocular-dev-tools');

module.exports = api => {
  const defaultConfig = getBabelConfig(api);
  // add custom settings
  const config = deepMerge(defaultConfig, {
    // overrides
  });
  return config;
};
```

#### webpack

If `webpack.config.js` is found at the root of the package, it is used to bundle browser tests and metrics collection. Otherwise, a default webpack config is used.

You may extend the default webpack config as follows:

```js
const {getWebpackConfig, deepMerge} = require('ocular-dev-tools');
module.exports = env => {
  const defaultConfig = getWebpackConfig(env);
  // add custom settings
  const config = deepMerge(defaultConfig, {
    // overrides
  });
  return config;
};
```

#### ocular-dev-tools.js

A file `.ocularrc.js` (or `.ocularrc.cjs` for `type:module` projects) can be placed at the root of the package to customize the dev scripts. The config file may export a JSON object that contains the following keys, or a callback function that returns such object:

- `lint`
  + `paths` (Arrray) - directories to include when linting. Default `['modules', 'src']`
  + `extensions` (Array) - file extensions to include when linting. Default `['js', 'md']`
- `babel`
  + `extensions` - List of file extensions (prefixed with `.`) that `babel` will process. Default `['.es6', '.js', '.es', '.jsx', '.mjs']`
- `aliases` (Object) - additional [module aliases](https://www.npmjs.com/package/module-alias) to use in tests. Default {}.
- `entry` (Object) - entry points for tests.
  + `test` (String) - unit test entry point. Default `./test/index`.
  + `test-browser` (String|[Object](https://webpack.js.org/concepts/entry-points/)) - unit test browser entry point. Default `./test/browser`.
  + `bench` (String) - benchmark entry point. Default `./test/bench/index`.
  + `bench-browser` (String|[Object](https://webpack.js.org/concepts/entry-points/)) - benchmark browser entry point. Default `./test/bench/browser`.
  + `size` (String|[Object](https://webpack.js.org/concepts/entry-points/)) - metrics entry points. Default `./test/size`.
- `browserTest` (Object) - options for browser tests. Passed to [BrowserTestDriver.run](https://uber-web.github.io/probe.gl/#/documentation/api-reference-testing/browsertestdriver).
