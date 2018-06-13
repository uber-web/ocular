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

import slug from 'slug'

import Home from 'components/Home'
import Search from 'components/Search'

import mdRoutes from 'mdRoutes'
import jsRoutes from 'jsRoutes'

import { HOME_PATH } from 'config'

const generatePaths = (children, parentPath, order = []) =>
  children.map((child, rank) => {
    const path = `${parentPath}/${child.path || slug(child.name, { lower: true })}`
    const newOrder = [...order, rank]
    return child.children
      ? { ...child, path, order: newOrder, children: generatePaths(child.children, path, newOrder) }
      : { ...child, path, order: newOrder, hasToc: true }
  })

const compareOrders = (route1, route2) => {
  const minLength = Math.min(route1.order.length, route2.order.length)
  for (let i = 0; i < minLength; i++) {
    if (route1.order[i] < route2.order[i]) {
      return -1
    }
    if (route1.order[i] > route2.order[i]) {
      return 1
    }
  }
  return 0
}

const getNestedPath = d => (d.children ? getNestedPath(d.children[0]) : d.path)

const reduction = cur =>
  cur.children
    ? [{ path: cur.path, redirect: getNestedPath(cur.children[0]) }, ...cur.children.map(reduction)]
    : cur

export const trees = mdRoutes.reduce((out, { name, path, children = [], data = [] }) => {
  out[path] = { name, tree: generatePaths([...children, ...data], path) }
  return out
}, {})

const routes = Object.keys(trees)
  .reduce((out, key) => {
    const { tree } = trees[key]
    const reduced = tree.reduce((acc, cur) => acc.concat(flatten(reduction(cur))), [])
    const final = [...reduced, reduced[0] && { path: key, redirect: reduced[0].path }].filter(
      d => d
    )
    return out.concat(final)
  }, [])
  .sort((a, b) => {
    if (b.redirect) {
      return -1
    }
    if (a.redirect) {
      return 1
    }
    if (a.markdown && b.markdown) {
      return compareOrders(a, b)
    }
    return 0
  })

let lastRouteWithDocs
const routesPrevNext = routes.reduce((prev, route, i) => {
  prev.push(route)
  if (route.markdown) {
    if (lastRouteWithDocs !== undefined) {
      prev[lastRouteWithDocs].next = {
        name: route.name,
        path: route.path
      }
      prev[i].prev = {
        name: prev[lastRouteWithDocs].name,
        path: prev[lastRouteWithDocs].path
      }
    }
    lastRouteWithDocs = i
  }
  return prev
}, [])

const flatRoutes = routesPrevNext.map(route => {
  if (route.redirect) {
    const directRoute = routes.find(r => r.path === route.redirect)
    if (directRoute && directRoute.redirect) {
      return {
        ...route,
        redirect: directRoute.redirect
      }
    }
  }
  return route
})

export default [
  {
    path: '/',
    exact: true,
    component: Home,
    redirect: HOME_PATH === '/' ? null : HOME_PATH
  },
  {
    path: '/search',
    exact: true,
    component: Search
  },
  ...jsRoutes,
  ...flatRoutes
]

function flatten(arr) {
  if (!arr.length) {
    return arr
  }
  return arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr), [])
}
