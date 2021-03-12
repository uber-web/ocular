# What's New

## ocular-dev-tools

### v0.4.0 (alpha)

Release Date: This release is still in development

#### Command logging

The various scripts now log the actual commands they issue, making it easier
to see what ocular is doing under the hood.

```sh
dev-tools (ib/log-commands *)$ yarn lint fix
yarn run v1.22.5
$ ocular-lint fix
Running prettier in ./src...
+ npx prettier --loglevel warn --write './src/**/*.js' '*.js'
Running eslint in ./src...
+ npx eslint --fix './src/**/*.js'
Lockfile valid.
✨  Done in 2.15s.
```

#### **Functional entry points**

Functional entry points can now be imported, instead of importing from subpaths.

```js
const {getESLintConfig} = require('ocular-dev-tools');

const config = getESLintConfig({react: '16.8.2'});

// Make any changes to default config here

module.exports = config;
```

### **Typescript for function entry points**

The new entry points have JSDoc and typescript definitions. This enables
better checking of arguments and also allows users to see intellisense
information in vscode etc.


### v0.3.0

Some release details are available in the [CHANGELOG](https://github.com/uber-web/ocular/blob/master/modules/dev-tools/CHANGELOG.md)

- `ocular-test node-debug` - New mode - starts node debugger
