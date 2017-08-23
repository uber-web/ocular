import React, {Component} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import StarIcon from 'react-icons/lib/go/star';
import GithubIcon from 'react-icons/lib/go/mark-github';

import {toggleMenu, setHeaderOpacity} from 'reducers/ui';
import {PROJECT_NAME, PROJECT_URL, PROJECTS} from 'config';

import * as pute from 'constants'
console.log(PROJECT_NAME, 'yoo')

@connect(({
  ui: {isMenuOpen, headerOpacity},
  router: {location: {pathname}},
  github: {repo: {stargazers_count}},
}) => ({
  isMenuOpen,
  headerOpacity,
  pathname,
  stargazers_count,
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
    const {isMenuOpen, opacity, stargazers_count} = this.props;

    return (
      <header className={cx({open: isMenuOpen})}>
        <div className="bg" style={{opacity}} />

        <div className="container">

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
            <NavLink activeClassName="active" to="/documentation">{'Documentation'}</NavLink>
            <a href="http://uber.github.io/deck.gl/blog/latest">Blog</a>
            <a href={PROJECT_URL}>
              {'Github'}
              <GithubIcon style={{marginLeft: '0.5rem'}} />
            </a>
            <span className="Stars fac fje">
              {stargazers_count || '...'}
              <StarIcon style={{marginLeft: '0.5rem'}} />
            </span>
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
