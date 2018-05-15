# Custom Pages

## Presentation
Custom Pages refers to components which can be accessed with through a unique url suffix (and a link from the header), but which won't appear in a table of content. 

The correspondance between url paths and Custom Pages is described in the file __/src/jsRoutes.js__, which is empty by default.

Unlike [Documentation Routes](./2-documentation-routes.md), Ocular won't create this file automatically, but you have the possibility to create it if needed.

## the jsRoutes.js file

Like for [Documentation Routes](./2-documentation-routes.md), the purpose of __src/jsRoutes.js__ is to export an array of objects. 

These objects have the same structure as [react-router Routes](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md) which are used by Ocular, but they also need a __name__ property which is how they will appear in the header.  

Examples of additional properties are:
- path (String): the url suffix that will correspond to that custom Page. 
- component (React component): the component which will be rendered. 

But that object can also use the other syntaxes of react-routes.

## Overriding default links

Technically, you can use the jsRoutes file to override the paths '/' and '/search', which are associated to built-in components. If you want the '/' path to point to something else than the Home component you can achieve that through jsRoutes.

