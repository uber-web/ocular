import React from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {trees} from 'routes';

const getRootPath = pathname => `/${pathname.split('/')[1]}`;

const renderRoute = (route, i) => route.env && process.env.NODE_ENV !== route.env ? null : (
  <div key={i}>
    {route.children ? (
      <div>
        <NavLink
          to={route.path}
          activeClassName="active"
          className={cx('list-header', {expanded: route.expanded})}
        >
          {route.name}
        </NavLink>
        <div className="subpages" style={{maxHeight: 40 * route.children.length}}>
          <ul>
            {route.children.map(renderRoute)}
          </ul>
        </div>
      </div>
    ) : (
      <li>
        <NavLink
          to={route.path}
          className="link"
          activeClassName="active"
        >
          {route.name}
        </NavLink>
      </li>
    )}
  </div>
);

const Toc = ({className, open, tree}) => tree ? (
  <div className={cx('toc', {open}, className)}>
    <div>
      {tree.map(renderRoute)}
    </div>
  </div>
) : null;

export default connect(({
  router: {location: {pathname}},
  ui: {isMenuOpen},
}) => ({
  pathname,
  open: isMenuOpen,
  tree: trees[getRootPath(pathname)] && trees[getRootPath(pathname)].tree,
}),
)(Toc);
