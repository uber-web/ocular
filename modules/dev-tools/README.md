# ocular-dev-tools

Experimental dev tools for our open source Javascript frameworks


contains developer targets for building, cleaning, linting, testing and publishing frameworks.

* The testing script has a number of modes, it can run tests on both browser and node, it can run test on src or built distributions etc.
* The linting feature supports both code and markdown, and runs both eslint and prettier.
* Supports both single module repos (all code in `src`) and monorepos (code in `modules/<module-name>/src).


Note: flow is not currently integrated into ocular-dev-tools as we restrict its use to React related code bases.


## Requirements/Limitations

ocular is built for frameworks in the vis.gl suite. It is not intended to be a general, hifhly configurable tool. It expects `examples`, `test` and doc folders organized in a certain way.



## Installation

```
yarn add ocular-dev-tools reify
```

Your `package.json` should looks something like:

```
  "devDependencies": {
    "ocular-dev-tools": "*",
    "reify": "^0.18.1"
  }
```


## Usage

After installing you can set up your build scripts in package.json as follows:

```
  "scripts": {
    "clean": "ocular-clean",
    "build": "ocular-build && ocular-bundle",
    "lint": "ocular-lint",
    "publish-prod": "ocular-publish prod",
    "publish-beta": "ocular-publish beta",
    "test": "ocular-test"
  },
```


### Configuration

To provide maximum control to the user, ocular build scripts use config files in the framework repo. In cases where such files allow for importing other templates, ocular provides exports that can be used, if not it provides a template that the user can copy into the frameworks root directory.

* `babel.config.js` - 
* `webpack.config.js` -
* eslintrc - 
* TBA

