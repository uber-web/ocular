import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';

import ui from './ui';
import github from './github';

export default combineReducers({
  router,
  ui,
  github,
});
