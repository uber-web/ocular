import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';

import ui from './ui';
import vis from './vis';
import github from './github';

export default combineReducers({

  router,

  ui,
  vis,
  github,

});
