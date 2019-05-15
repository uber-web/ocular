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

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import StarIcon from 'react-icons/lib/go/star';
import GithubIcon from 'react-icons/lib/go/mark-github';
import classNames from 'classnames';
// import {trees} from 'routes';
// import {toggleMenu, setHeaderOpacity} from 'reducers/ui';

import {Link} from 'gatsby';

const propTypes = {
  config: PropTypes.object.isRequired
};

/*
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
*/

function GithubLink() {
  return (
    <div className="github-link">
      <span>Github</span>
      <GithubIcon
        style={{marginLeft: '0.5rem', display: 'inline'}}
      />
      {/* <span className="Stars fac fje">
        {props.githubLoading ? '...' : props.stargazers_count}
        <StarIcon style={{ marginLeft: '0.5rem', display: 'inline' }} />
      </span> */}
    </div>
  );
}

function HeaderLink({to, href, label, classnames = ''}) {
  if (to) {
    return (
      <Link to={to} className={classnames}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={classnames}>
      {label}
    </a>
  );
}

/**
 * Generate all the links in the header.
 * @param  {Object} props Input props which includes site config.
 * @return {Array}  Array of link object ({label, to, href, classnames})
 */
function generateHeaderLinks(props) {
  const {config = {}} = props;

  const exampleLink = config.EXAMPLES &&
    config.EXAMPLES.length > 0 &&
    {label: 'Examples', to: '/examples'};

  const githubLink = config.PROJECT_TYPE === 'github' &&
    {
      classnames: 'z',
      href: props.config.PROJECT_URL,
      label: (<GithubLink />)
    };

  const additionalLinks = config.ADDITIONAL_LINKS &&
    config.ADDITIONAL_LINKS.length > 0 &&
    config.ADDITIONAL_LINKS.map(link => ({...link, label: link.name}));

  return [
    exampleLink,
    {label: 'Documentation', to: '/docs'},
    {label: 'Search', to: '/search'},
    {label: 'Blog', href: 'https://medium.com/@vis.gl'},
    githubLink,
    ...additionalLinks
  ].filter(Boolean);
}

export default class Header extends Component {
  constructor(props) {
    super(props);
    // we need to know the number of links before render.
    // this is not an ideal solution.
    // some of the links which are hardcoded should come from configuration
    // TODO - let's create the links server side, then pass them to the template as props.
    this.state = {
      links: generateHeaderLinks(props)
    };
  }

  renderHeader() {
    // TODO/ib - replace data with config
    const {
      config = {},
      pathname,
      isSmallScreen,
      isMenuOpen,
      opacity
    } = this.props;
    const {
      PROJECT_NAME,
      PROJECTS = []
    } = config;

    const {links} = this.state;

    return (
      <header className={classNames({open: isMenuOpen})}>
        <div className="bg" style={{opacity}} />

        <div className="f header-content">
          <a className="logo" href="#/">
            {PROJECT_NAME}
          </a>

          <div className="site-links">
            <div className="site-link">
              <Link to="/">{PROJECT_NAME}</Link>
            </div>
            {PROJECTS.map(({name, url}) => (
              <div className="site-link" key={name}>
                <a href={url}>{name}</a>
              </div>
            ))}
          </div>

          <div
            className="links fac"
            style={{
              maxHeight:
                isSmallScreen && isMenuOpen
                  ? `${4 * links.length}rem`
                  : undefined
            }}
          >
            {/* If the no examples marker, return without creating pages */}
            {links.map((link, index) => (
              <HeaderLink
                {...link}
                key={index}
                classnames={classNames({
                  ...link.classnames,
                  active: link.to && pathname === link.to
                })}
              />
            ))}
          </div>

          <div
            className="menu-toggle"
            onClick={() => this.props.toggleMenu(!isMenuOpen)}
          >
            <i className={`icon icon-${isMenuOpen ? 'close' : 'menu'}`} />
          </div>
        </div>
      </header>
    );
  }

  render() {
    return this.renderHeader();
    /*
    return (
      <StaticQuery query={graphql`
    query StaticQuery {
      site {
        siteMetadata {
          config {
            PROJECT_TYPE
          }
        }
      }
    }
    `}
        render={data => {
          return this.renderHeader(data)
        }}
      />
    );
    */
  }
}

Header.propTypes = propTypes;
