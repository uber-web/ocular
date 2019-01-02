const {setSiteConfig, registerReactComponent} = require('ocular');
const config = require('./ocular-config');

const Hero = 'Hero'; // require('./src/hero').default ;

registerReactComponent('Hero', 'Hero');

// TODO/ib - Major hack to work around broken StaticQuery in persistent-layout.js.
// Makes config available in the browser.
exports.onClientEntry = () => {
  setSiteConfig(config);
  console.log('Ocular loaded', config)
}
