# ocular-dev-tools

Dev tools for vis.gl open source Javascript frameworks

Contains developer targets for building, cleaning, linting, testing and publishing frameworks.

* The testing script has a number of modes, it can run tests on both browser and node, it can run test on src or built distributions etc.
* The linting feature supports both code and markdown, and runs both eslint and prettier.
* Supports both single module repos (all code in src) and monorepos (code in `modules/<module-name>/src`).


Note: flow is not currently integrated into ocular-dev-tools as we restrict its use to React related code bases.


## Installation

```bash
yarn add ocular-dev-tools reify -D
# optionally enable browser tests
yarn add @probe.gl/test-utils -D
```

Your `package.json` should looks something like:

```json
  "devDependencies": {
    "ocular-dev-tools": "*",
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

### Command Line Tools

#### ocular-bootstrap

Installing dependencies for a monorepo.

#### ocular-clean

Remove all transpiled files in preparation for a new build.

#### ocular-build

Transpile all modules.

#### ocular-lint

Run eslint & prettier on the code base.

```bash
ocular-lint [mode]
```

Modes:

- `full` (default) - run on all files.
- `pre-commit` - only run on changed files since the last commit.
- `fix` - run prettier and eslint --fix on all files.

[Configurations](#ocular-dev-tools-1): `lint`

#### ocular-test

Run tests.

```bash
ocular-test [mode]
```

Modes:

- `full` (default) - run lint, unit tests in node and headless browser
- `fast` - run lint in pre-commit mode, unit tests in node
- `dist` - run unit tests with transpiled (es5) code
- `cover` - run unit tests and generate coverage report
- `ci` - run lint, coverage, metrics and unit tests in headless browser
- `node` - run unit tests in node
- `browser` - run unit tests in browser (kept open for debugging)
- `browser-headless` - run unit tests in headless browser
- `bench` - run benchmarks in node
- `bench-browser` - run benchmarks in browser (kept open for debugging)
- other - custom mode:
  + If -browser is in the mode name, run in browser, otherwise run in node
  + If -browser-headless is in the mode name, run in headless browser
  + The rest of the name is used to look up the entry point from the entry config.

[Configurations](#ocular-dev-tools-1): `aliases`, `entry`

#### ocular-metrics

Bundle the source and report the bundle size.

[Configurations](#ocular-dev-tools-1): `entry`

#### ocular-publish

Publish the packages, create git tag and push.

```bash
ocular-publish [mode]
```

Modes:

- `beta` - bump pre-release version and publish with beta flag.
- `prod` - bump patch version and publish.


### Configuration

To provide maximum control to the user, ocular build scripts use config files in the framework repo. In cases where such files allow for importing other templates, ocular provides exports that can be used, if not it provides a template that the user can copy into the frameworks root directory.

#### babel

If `.babelrc` or `babel.config.js` is found at the root of the package, it is used to transpile all source code. Otherwise, a default babel config is used.

You may extend the default babel config as follows:

```js
// babel.config.js
const getBabelConfig = require('ocular-dev-tools/config/babel.config');

module.exports = api => {
  const config = getBabelConfig(api);
  // add custom settings
  return config;
};
```

#### webpack

If `webpack.config.js` is found at the root of the package, it is used to bundle browser tests and metrics collection. Otherwise, a default webpack config is used.

You may extend the default webpack config as follows:

```js
const getWebpackConfig = require('ocular-dev-tools/config/webpack.config');
module.exports = env => {
  const config = getWebpackConfig(env);
  // add custom settings
  return config;
};
```

#### ocular-dev-tools

A file `ocular-dev-tools.config.js` can be placed at the root of the package to customize the dev scripts. The config file may export a JSON object that contains the following keys, or a callback function that returns such object:

- `lint`
  + `paths` (Arrray) - directories to include when linting. Default `['modules', 'src']`
  + `extensions` (Array) - file extensions to include when linting. Default `['js', 'md']`
- `aliases` (Object) - additional [module aliases](https://www.npmjs.com/package/module-alias) to use in tests. Default {}.
- `entry` (Object) - entry points for tests.
  + `test` (String) - unit test entry point. Default `./test/index`.
  + `test-browser` (String|[Object](https://webpack.js.org/concepts/entry-points/)) - unit test browser entry point. Default `./test/browser`.
  + `bench` (String) - benchmark entry point. Default `./test/bench/index`.
  + `bench-browser` (String|[Object](https://webpack.js.org/concepts/entry-points/)) - benchmark browser entry point. Default `./test/bench/browser`.
  + `size` (String|[Object](https://webpack.js.org/concepts/entry-points/)) - metrics entry points. Default `./test/size`.
- `browserTest` (Object) - options for browser tests. Passed to [BrowserTestDriver.run](https://uber-web.github.io/probe.gl/#/documentation/api-reference-testing/browsertestdriver).
