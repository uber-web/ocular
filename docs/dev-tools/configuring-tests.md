# Configuring Tests

ocular-dev-tools automatically adds capability run tests in Node.js and live browser and headless-browser.

There are some things that may need to be configured:

## Running ES6+ code in tests

### Using import/export

The first thing you usually need to address is to sing import/export in Node.js requires taking extra steps

While Node 12 will soon enable `import`/`export` by default, you will typically want to at least add support for `import`/`export` under Node.js

Two tested options are:

* `require('reify')` - This makes Node.js understand `import`/`export`, but otherwise does not transpile your code. This is a great option if you want to test your source code directly, either because you want to debug untranspiled code, or you want to ensure that your code runs untranspiled to ensure you don't use unsupported syntax. You can simply require `reify` at the entry point of your test:

```
// test/index.js
require('reify');

// start to require your tests
require('./test1.js');

```

* `require('@babel/register')` - This option runs the babel transpiler. This is ideal if you want to use non-standard syntax such as stage-x babel plugins, flow etc.

You can import `@bable/register`, and that is how babel config is accessed in dev mode. Unless that module is imported, no transpilation is done on your source.

You may also manually set the `BABEL_ENV` environment variable when running your test command to control which config to use.

```sh
BABEL_ENV=es6 yarn test
```
