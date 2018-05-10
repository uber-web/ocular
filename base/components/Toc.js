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

import React, { PureComponent } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { trees } from 'routes'

const getRootPath = pathname => `/${pathname.split('/')[1]}`

const renderRoute = (route, i, pathname) => (
  <div key={i}>
    {route.children ? (
      <div>
        <Link
          to={route.path}
          className={cx('list-header', {
            expanded: route.expanded,
            active: pathname.includes(route.path)
          })}
        >
          {route.name}
        </Link>
        <div className="subpages" style={{ maxHeight: getHeight(route) }}>
          >
          <ul>{route.children.map((r, idx) => renderRoute(r, idx, pathname))}</ul>
        </div>
      </div>
    ) : (
      <li>
        <Link to={route.path} className={cx('link', { active: pathname.includes(route.path) })}>
          {route.name}
        </Link>
      </li>
    )}
  </div>
)

@connect(({ router: { location: { pathname } }, ui: { isMenuOpen } }) => ({
  pathname,
  open: isMenuOpen,
  tree: trees[getRootPath(pathname)] && trees[getRootPath(pathname)].tree
}))
class Toc extends PureComponent {
  render() {
    const { className, open, tree, pathname } = this.props

    if (!tree) {
      return null
    }
    return (
      <div className={cx('toc', { open }, className)}>
        <div>{tree.map((route, i) => renderRoute(route, i, pathname))}</div>
      </div>
    )
  }
}

export default Toc

function getHeight(route) {
  return route.children.reduce((prev, curr) => prev + (curr.children ? getHeight(curr) : 40), 0)
}
