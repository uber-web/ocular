// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react'
import { Switch, Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { push, ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'
import ReactGA from 'react-ga'

import Wrapper from 'components/Wrapper'
import Header from 'components/Header'
import Toc from 'components/Toc'

import { fetchInfos } from 'actions/github'
import createStore from 'store'
import routes from 'routes'
import { BASENAME, HISTORY, PROJECT_TYPE, GA_TRACKING } from 'config'

import '../styles/main.scss'

const history =
  HISTORY === 'browser'
    ? createBrowserHistory({ basename: BASENAME ? BASENAME : '' })
    : createHashHistory()

if (GA_TRACKING) {
  ReactGA.initialize(GA_TRACKING)

  history.listen(location => ReactGA.pageview(`${location.pathname}${location.search}`))
}

const store = createStore(history)

const boot = () => {
  if (PROJECT_TYPE === 'github') {
    store.dispatch(fetchInfos())
  }
}

boot()

window.onclick = e => {
  const el = e.target || e.srcElement
  const useHistory = el.hasAttribute('useHistory')
  if (!useHistory) {
    return
  }

  e.preventDefault()

  const href = el.getAttribute('href')
  store.dispatch(push(href))
}

const getWrapper = props => () => <Wrapper {...props} />

export default () => {
  return (

  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Header />

        <div>
          <div className="f fg main-container">
            <Toc />
            <Switch>
              {routes.map(
                route =>
                  route.redirect ? (
                    <Redirect key={route.path} from={route.path} to={route.redirect} />
                  ) : (
                    <Route key={route.path} {...route} component={getWrapper(route)} />
                  ),
              )}
            </Switch>
          </div>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
);
}