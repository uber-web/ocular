# getEslintConfig

Create a `ocular-dev-tools` default eslint config.

## Usage

```js
// .eslintrc.js
const {getESlintConfig} = requre('ocular-dev-tools/configuration');

modules.export = getESlintConfig({
  /** Set React version, if any */
  react: '18.0.0',
  /** This will be deep merged with the default config */
  overrides: {
    parserOptions: {
      project: ['./tsconfig.json']
    },
    rules: {
      // custom rules
    }
  },
  /** Print full config JSON for inspection */
  debug: true
});
```
