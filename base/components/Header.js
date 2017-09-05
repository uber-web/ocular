import React, {Component} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import StarIcon from 'react-icons/lib/go/star';
import GithubIcon from 'react-icons/lib/go/mark-github';

import {trees} from 'routes';
import {toggleMenu, setHeaderOpacity} from 'reducers/ui';
import {ADDITIONAL_LINKS, PROJECT_TYPE, PROJECT_NAME, PROJECT_URL, PROJECTS} from 'config';

@connect(({
  ui: {isMenuOpen, headerOpacity},
  router: {location: {pathname}},
  github: {loading: githubLoading, repo: {stargazers_count}},
}) => ({
  isMenuOpen,
  headerOpacity,
  pathname,
  stargazers_count,
  githubLoading,
}), {
  toggleMenu,
  setHeaderOpacity,
})
class Header extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.pathname === nextProps.pathname) { return; }
    this.props.setHeaderOpacity(1);
    this.props.toggleMenu(false);
  }

  render() {
    const {isMenuOpen, opacity, stargazers_count, githubLoading} = this.props;

    return (
      <header className={cx({open: isMenuOpen})}>
        <div className="bg" style={{opacity}} />

        <div className="f header-content">

          <a className="logo" href="#">
            {PROJECT_NAME}
          </a>

          <div className="site-links">
            <div className="site-link">
              <NavLink activeClassName="active" to="/">{PROJECT_NAME}</NavLink>
            </div>
            {Object.keys(PROJECTS).map(name => (
              <div className="site-link" key={name}>
                <a href={PROJECTS[name]}>{name}</a>
              </div>
            ))}
          </div>

          <div className="links fac">

            <NavLink activeClassName="active" to="/search">{'Search'}</NavLink>

            {Object.keys(trees).map(p => (
              <NavLink key={p} activeClassName="active" to={p}>{trees[p].name}</NavLink>
            ))}

            {ADDITIONAL_LINKS.map(link => (
              <a key={link.href} href={link.href}>{link.name}</a>
            ))}

            {PROJECT_TYPE === 'github' && (
              <div className="z">
                <a href={PROJECT_URL}>
                  {'Github'}
                  <GithubIcon style={{marginLeft: '0.5rem'}} />
                </a>
                <span className="Stars fac fje">
                  {githubLoading ? '...' : stargazers_count}
                  <StarIcon style={{marginLeft: '0.5rem'}} />
                </span>
              </div>
            )}
          </div>

          <div className="menu-toggle" onClick={() => this.props.toggleMenu(!isMenuOpen)}>
            <i className={`icon icon-${isMenuOpen ? 'close' : 'menu'}`} />
          </div>

        </div>

      </header>
    );
  }

}

export default Header;
