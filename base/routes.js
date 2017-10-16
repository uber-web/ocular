import slug from 'slug'

import Home from 'components/Home'
import Search from 'components/Search'

import mdRoutes from 'mdRoutes'
import jsRoutes from 'jsRoutes'

const generatePaths = (d, parentPath) =>
  d.map(sub => {
    const path = `${parentPath}/${sub.path || slug(sub.name, { lower: true })}`
    return sub.children
      ? { ...sub, path, children: generatePaths(sub.children, path) }
      : { ...sub, path, hasToc: true }
  })

const getNestedPath = d => (d.children ? getNestedPath(d.children[0]) : d.path)

const reduction = cur =>
  cur.children
    ? [{ path: cur.path, redirect: getNestedPath(cur.children[0]) }, ...cur.children.map(reduction)]
    : cur

export const trees = mdRoutes.reduce((out, { name, path, data = [] }) => {
  out[path] = { name, tree: generatePaths(data, path) }
  return out
}, {})

const routes = Object.keys(trees).reduce((out, key) => {
  const { tree } = trees[key]
  const reduced = tree.reduce((acc, cur) => acc.concat(reduction(cur)), [])
  const final = [...reduced, reduced[0] && { path: key, redirect: reduced[0].path }]
    .filter(d => d)
    .sort((a, b) => (b.redirect ? -1 : a.redirect ? 1 : 0))

  return out.concat(final)
}, [])

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/search',
    exact: true,
    component: Search,
  },
  ...jsRoutes,
  ...routes,
]
