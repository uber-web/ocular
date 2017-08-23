import React from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {docTree} from 'routes';

const renderRoute = (route, i) => (
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

const Toc = ({className, pathname}) => (
  <div className={cx('toc hide-mobile', className, {hide: !pathname.includes('/documentation')})}>
    <div>
      {docTree.map(renderRoute)}
    </div>
  </div>
);

export default connect(
  ({router}) => ({pathname: router.location.pathname}),
)(Toc);
