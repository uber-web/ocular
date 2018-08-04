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
    // order represents the rank of each path in all of its parents.
    // ie the 2nd child of the 3rd child of the 1st tree would be [0, 2, 1]
    const updatedOrder = [...order, rank]
    const updatedChild = { ...child, path, order: updatedOrder }

    return child.children
      ? { ...updatedChild, children: generatePaths(child.children, path, updatedOrder) }
      : { ...updatedChild, hasToc: true }
  })

const compareOrders = (route1, route2) => {
  // this comparison function determines if one route comes after the other
  // in the table of content.
  // to do that, it uses the 'order' property computed above.
  // example: one route is the 2nd child of the 3rd child of the 1st tree - [0, 2, 1]
  // the other one is the 3rd child of the 2nd child of the 1st tree - [0, 1, 2]
  // the second route should come first, because it's in the 2nd child not the 3d.

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

export const trees = [...(mdRoutes || []), ...(jsRoutes || [])].reduce(
  (out, { name, path, children = [], data = [] }) => {
    out[path] = { name, tree: generatePaths([...children, ...data], path) }
    return out
  },
  {}
)

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
    // routes which are just redirections to documentation pages are pushed towards the bottom.
    if (b.redirect) {
      return -1
    }
    if (a.redirect) {
      return 1
    }
    // documentation routes are sorted in the same order as in the table of contents.
    // that order is not guaranteed without sorting them.
    if (a.markdown && b.markdown) {
      return compareOrders(a, b)
    }
    return 0
  })

let lastRouteWithContent
const routesPrevNext = routes.reduce((prev, route, i) => {
  // this adds to each route with documentation (.markdown property) the reference
  // of the previous and next routes with documentation
  prev.push(route)
  if (route.markdown || route.component) {
    if (lastRouteWithContent !== undefined) {
      prev[lastRouteWithContent].next = {
        name: route.name,
        path: route.path
      }
      prev[i].prev = {
        name: prev[lastRouteWithContent].name,
        path: prev[lastRouteWithContent].path
      }
    }
    lastRouteWithContent = i
  }
  return prev
}, [])

const flatRoutes = routesPrevNext.map(route => {
  // this makes routes that have a redirect point to a route without one
  // instead of having chain redirects.
  // we don't use redirects in TOC anymore but these links may exist somewhere in the wild.
  // will be deprecated in a few versions.
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
  ...flatRoutes
]

function flatten(arr) {
  if (!arr.length) {
    return arr
  }
  return arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr), [])
}
