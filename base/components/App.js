import React from 'react'
import { Switch, Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { push, ConnectedRouter } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createHashHistory from 'history/createHashHistory'

import Markdown from 'components/Markdown'
import Header from 'components/Header'
import Page from 'components/Page'
import Toc from 'components/Toc'

import { fetchInfos } from 'actions/github'
import createStore from 'store'
import routes from 'routes'
import { BASENAME, HISTORY, PROJECT_TYPE } from 'config'

import '../styles/main.scss'

const history =
  HISTORY === 'browser'
    ? createBrowserHistory({ basename: BASENAME ? BASENAME : '' })
    : createHashHistory()

const store = createStore(history)

const boot = () => {
  if (PROJECT_TYPE === 'github') {
    store.dispatch(fetchInfos())
  }
}

boot()

const doRender = route => {
  const Component = route.markdown ? Markdown : Page

  if (route.onUpdate) {
    route.onUpdate()
  }

  return () => (
    <div className="fg">
      <div className="f container page">
        <Component {...route} />
      </div>
    </div>
  )
}

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

export default () => (
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
                    <Route key={route.path} render={doRender(route)} {...route} />
                  ),
              )}
            </Switch>
          </div>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
)
