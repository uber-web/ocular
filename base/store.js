import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from 'reducers';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

export default (history, initialState = {}) => {

  const middlewares = [routerMiddleware(history), thunk];
  const enhancers = compose(applyMiddleware(...middlewares), devTools);
  const store = createStore(reducers, initialState, enhancers);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
