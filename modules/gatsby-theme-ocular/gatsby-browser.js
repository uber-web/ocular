// ie 11 polyfill
import 'whatwg-fetch';

export function onClientEntry() {
  console.log('gatsby-theme-ocular loaded'); // eslint-disable-line
}

export {default as wrapPageElement} from './src/gatsby-common/wrap-page';
