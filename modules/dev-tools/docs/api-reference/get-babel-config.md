# getBabelConfig

Create a `ocular-dev-tools` default babel config.

## Usage

```js
// babel.config.js
const {getBabelConfig} = require('ocular-dev-tools/configuration');

module.exports = getBabelConfig({
  /** Enable React preset */
  react: true,
  /** This will be deep merged with the default config */
  overrides: {
    plugins: [
      // custom plugins
    ]
  },
  /** Print full config JSON for inspection */
  debug: true
});
```

## Environments

The following environments may be used by various commands:

- `es5` - default commonjs entry point for non-ESM module used by `ocular-build`
- `esm` - default ESM entry point for non-ESM module used by `ocular-build`
- `esm-strict` - default ESM entry point for ESM module used by `ocular-build`
- `bundle` - production bundle settings used by `ocular-bundle`
- `bundle-dev` - developer bundle settings used by `ocular-bundle --env=dev`
