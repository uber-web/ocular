import React from 'react';
import {Switch, Route} from 'react-router';
import {Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createHashHistory';

import Markdown from 'components/Markdown';
import Header from 'components/Header';
import Page from 'components/Page';
import Toc from 'components/Toc';

import {fetchInfos} from 'actions/github';
import createStore from 'store';
import routes from 'routes';
import {PROJECT_TYPE} from 'config';

import '../styles/main.scss';

const history = createHistory();
const store = createStore(history);

const boot = () => {
  if (PROJECT_TYPE === 'github') {
    store.dispatch(fetchInfos());
  }
};

boot();

const getComponent = route => {
  const Component = route.markdown ? Markdown : Page;

  return () => (
    <div className="fg">
      <div className="f container page">
        <Component {...route} />
      </div>
    </div>
  );

};

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />

        <div>
          <div className="f fg">
            <Toc />
            <Switch>
              {routes.map(route => route.redirect ? (
                <Redirect key={route.path} from={route.path} to={route.redirect} />
              ) : (
                <Route
                  key={route.path}
                  component={getComponent(route)}
                  {...route}
                />
              ))}
            </Switch>
          </div>
        </div>

      </div>
    </ConnectedRouter>
  </Provider>
);
