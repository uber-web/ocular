import {registerDefaultReactComponent} from './src/utils/component-registry';

import Home from './src/components/home';
import Hero from './src/components/hero';
import ExampleRunner from './src/components/example-runner';
import InfoPanel from './src/components/info-panel';

export {default as wrapPageElement} from './src/gatsby-common/wrap-page';

export function onClientEntry() {
  console.log('Ocular loaded'); // eslint-disable-line
}

registerDefaultReactComponent('Home', Home);
registerDefaultReactComponent('Hero', Hero);
registerDefaultReactComponent('ExampleRunner', ExampleRunner);
registerDefaultReactComponent('InfoPanel', InfoPanel);

registerDefaultReactComponent('EXAMPLES', {});
registerDefaultReactComponent('HERO_EXAMPLE', null);
