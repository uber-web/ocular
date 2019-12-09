// ie 11 polyfill
import 'whatwg-fetch';

export {default as wrapPageElement} from './src/gatsby-common/wrap-page';

export function onClientEntry() {
  console.log('Ocular loaded'); // eslint-disable-line
}
