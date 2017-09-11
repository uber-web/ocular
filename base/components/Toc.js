import React, {PureComponent} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {trees} from 'routes';

const getRootPath = pathname => `/${pathname.split('/')[1]}`;

const renderRoute = (route, i, pathname) => (
  <div key={i}>
    {route.children ? (
      <div>
        <Link
          to={route.path}
          className={cx('list-header', {
            expanded: route.expanded,
            active: pathname.includes(route.path),
          })}
        >
          {route.name}
        </Link>
        <div className="subpages" style={{maxHeight: 40 * route.children.length}}>
          <ul>
            {route.children.map((route, i) => renderRoute(route, i, pathname))}
          </ul>
        </div>
      </div>
    ) : (
      <li>
        <Link
          to={route.path}
          className={cx('link', {active: pathname.includes(route.path)})}
        >
          {route.name}
        </Link>
      </li>
    )}
  </div>
);

@connect(({
  router: {location: {pathname}},
  ui: {isMenuOpen},
}) => ({
  pathname,
  open: isMenuOpen,
  tree: trees[getRootPath(pathname)] && trees[getRootPath(pathname)].tree
}))
class Toc extends PureComponent {

  render() {
    const {className, open, tree, pathname} = this.props;

    if (!tree) { return null; }
    return (
      <div className={cx('toc', {open}, className)}>
        <div>
          {tree.map((route, i) => renderRoute(route, i, pathname))}
        </div>
      </div>
    );
  }

}

export default Toc;
