import routes from 'routes'
import { HISTORY } from 'config'
import path from 'path'

export const findClosestRoute = (matchedText, routeList, searchPath) => {
  if (routeList.length === 0) {
    return undefined
  }
  if (routeList.length === 1) {
    // if there's only one route, that's the one
    return routeList[0]
  }
  if (!searchPath) {
    // Recursion base case
    // If searchPath is empty, return the first route that has "/" before the text.
    // If that also fails, return the first route of the list.
    return routeList.find(r => r.path.includes(`/${matchedText}`)) || routeList[0]
  }
  // If a route exist on the currentPath, return that one.
  // If not, iterate one step up on the path
  const reducedSearchPath = searchPath.replace(/^(.*)\/.*$/, '$1')
  return (
    routeList.find(r => r.path.includes(`${reducedSearchPath}/${matchedText}`)) ||
    findClosestRoute(matchedText, routeList, reducedSearchPath)
  )
}

export const fallBack = ({ className, href, text }) => {
  return `<a class=${className} href=${href}>${text}</a>`
}

export const getRouteFromFileLocation = (routeFileLocation, href) => {
  if (!routeFileLocation) {
    return undefined
  }
  const routePath = path.dirname(routeFileLocation)
  return routes.find(r =>
    // href contains the absolute location of a markdown file as specified in the routes definition
    href === r.fileLocation ||
    // href contains a relative link to a markdown file
    path.resolve(routePath, href) === r.fileLocation)
}

export const linkRenderer = (routePath, routeFileLocation) => (href, title, text) => {
  // starts with http:// or https:// ?
  const isFull = /^(https?:\/\/)/.test(href)

  // part of the href string between / character and end of string (ignoring final .md extension)
  const match = href.replace(/.*\/(.*)$/, '$1').replace(/\.md$/, '')
  if (isFull || !match) {
    return fallBack({ className: 'raw-link', href, text })
  }

  // attempt #1: if the link points to a file, and a route has this file as its fileLocation property,
  // returns route to this file.
  const routeFromFileLocation = getRouteFromFileLocation(routeFileLocation, href)

  // attempt #2: if no route is found with this solution, then tries to find a route that has a path
  // that corresponds to the part described on line 35.
  const matchingRoutes = routes.filter(r => r.path.includes(match))
  const routeFromPath = findClosestRoute(match, matchingRoutes, routePath)

  const route = routeFromFileLocation || routeFromPath

  // if a route isn't found either way, then we use the href link as is.
  if (!route) {
    return fallBack({ className: 'not-matched-link', href, text })
  }

  const addPrefix = HISTORY !== 'browser' && route.path.indexOf('/#') !== 0
  return `<a ${HISTORY === 'browser' ? 'useHistory' : ''} href="${addPrefix ? '/#' : ''}${
    route.path
  }">${text}</a>`
}
