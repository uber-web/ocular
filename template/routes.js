import slug from 'slug';

import Home from 'components/Home';

import docRoutes from 'docRoutes';

const generatePaths = (d, parentPath) =>
  d.map(sub => {
    const path = `${parentPath}/${slug(sub.name, {lower: true})}`;
    return sub.children
      ? {...sub, path, children: generatePaths(sub.children, path)}
      : {...sub, path, hasToc: true};
  });

export const docTree = generatePaths(docRoutes, '/documentation');

const getNestedPath = d => d.children ? getNestedPath(d.children[0]) : d.path;

const reduction = cur => cur.children
  ? [{path: cur.path, redirect: getNestedPath(cur.children[0])}, ...cur.children.map(reduction)]
  : cur;

const reducedDocs = docTree.reduce((acc, cur) => acc.concat(reduction(cur)), []);

const finalDocs = [...reducedDocs, {path: '/documentation', redirect: reducedDocs[0].path}]
  .sort((a, b) => !b.redirect && a.redirect ? 1 : 0);

export default [{
  path: '/',
  exact: true,
  component: Home
}, {
  path: '/examples',
}, ...finalDocs];
