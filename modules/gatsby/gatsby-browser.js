import {registerReactComponent} from './src/utils/component-registry';

import Home from './src/components/home';
import Hero from './src/components/hero';
import ExampleRunner from './src/components/example-runner';
import InfoPanel from './src/components/info-panel';

export {default as wrapPageElement} from './src/gatsby-common/wrap-page';

export function onClientEntry() {
  console.log('Ocular loaded')
}

registerReactComponent('Home', Home);
registerReactComponent('Hero', Hero);
registerReactComponent('ExampleRunner', ExampleRunner);
registerReactComponent('InfoPanel', InfoPanel);

registerReactComponent('EXAMPLES', {});
registerReactComponent('HERO_EXAMPLE', null);
