# getPrettierConfig

Get `ocular-dev-tools` default prettier config.

## Usage

```js
// .prettierrc.js
const {getPrettierConfig} = requre('ocular-dev-tools/configuration');

modules.export = getPrettierConfig({
  /** This will be deep merged with the default config */
  overrides: {
    // custom config
  },
  /** Print full config JSON for inspection */
  debug: true
});
```
