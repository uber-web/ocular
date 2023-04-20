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
