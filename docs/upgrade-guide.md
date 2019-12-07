# Upgrade Guide

## Upgrading from ocular-gatsby to gatsby-theme-ocular

Your website needs to update its `gatsby-config.js` and `gatsby-node.js` in the root, and unless you have added additional code, you can remove your `gatsby-browser.js` and `gatsby-ssr.js` as the default implementations can now be supplied by `gatsby-theme-ocular`.

`gatsby-config.js`:
```js
const ocularConfig = require('./ocular-config');

module.exports = {
  plugins: [{resolve: `gatsby-theme-ocular`, options: ocularConfig}],
};
```

`gatsby-node.js`:
```js
const {setOcularConfig} = require('gatsby-theme-ocular');

const ocularConfig = require('./ocular-config');
setOcularConfig(ocularConfig);
```