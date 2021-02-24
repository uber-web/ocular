# Configuring Tests

ocular-dev-tools automatically adds capability run tests in Node.js and live browser and headless-browser.

There are some things that may need to be configured:

## Running ES6+ code in tests

### Using import/export

The first thing you usually need to address is to sing import/export in Node.js requires taking extra steps.

While Node 13 supports `import`/`export` by default, it requires:
- a [type](https://nodejs.org/api/packages.html#packages_determining_module_system) field in every `package.json` that matches the module type. This becomes tricky when you import from a npm package that is missing this field.
- the whole repo to use one of esm module or commonjs style

Alternatively, you may use `require('@babel/register')` - This option runs the babel transpiler. The default babel config transforms all code for Node.js >=14, which allows the usage of import/export without too much meddling with the source code.

You may also manually set the `BABEL_ENV` environment variable when running your test command to control which config to use.

```sh
BABEL_ENV=es5 yarn test
```
