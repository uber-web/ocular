/* eslint-disable react/no-array-index-key */
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
import GithubIcon from 'react-icons/lib/go/mark-github';
import classNames from 'classnames';

import {
  HamburgerMenu,
  Header as StyledHeader,
  HeaderA,
  HeaderLink as StyledLink,
  HeaderLinksBlock,
  HeaderLinkContainer,
  HeaderLogo,
  HeaderMenuBlock,
  HeaderMenu,
  HeaderMenuLink
} from '../styled/';
import {navigate} from 'gatsby';
import {Search} from 'baseui/icon';
import {Input} from 'baseui/input';

import GithubStars from '../github/github-stars.jsx';

const propTypes = {
  config: PropTypes.object.isRequired
};

function GithubLink() {
  return (
    <div className="github-link">
      <span>Github</span>
      {/* <GithubIcon style={{marginLeft: '0.5rem', display: 'inline'}} /> */}
    </div>
  );
}

function HeaderLink({to, href, label}) {
  if (to) {
    return <StyledLink to={to}>{label}</StyledLink>;
  }
  return <HeaderA href={href}>{label}</HeaderA>;
}

/**
 * Generate all the links in the header.
 * @param  {Object} props Input props which includes site config.
 * @return {Array}  Array of link object ({label, to, href, classnames})
 */
function generateHeaderLinks(props) {
  const {config = {}} = props;

  const exampleLink = config.EXAMPLES &&
    config.EXAMPLES.length > 0 && {label: 'Examples', to: '/examples'};

  const githubLink = config.PROJECT_TYPE === 'github' && {
    classnames: 'z',
    href: `https://github.com/${config.PROJECT_ORG}/${config.PROJECT_NAME}`,
    label: <GithubLink />
  };

  const links = [
    exampleLink,
    {label: 'Documentation', to: '/docs'},
    {label: 'Search', to: '/search'},
    {label: 'Blog', href: 'https://medium.com/vis-gl'},
    githubLink
  ];

  if (config.ADDITIONAL_LINKS && config.ADDITIONAL_LINKS.length > 0) {
    config.ADDITIONAL_LINKS.map(link => ({...link, label: link.name})).forEach(
      link => {
        if (link.index !== undefined) {
          links.splice(link.index, 0, link);
        } else {
          links.push(link);
        }
      }
    );
  }

  return links.filter(Boolean);
}

const ControlledHeader = ({
  links,
  config = {},
  isSmallScreen,
  isLinksMenuOpen,
  isProjectsMenuOpen,
  toggleLinksMenu,
  toggleProjectsMenu
}) => {
  const {PROJECT_NAME, PROJECTS = []} = config;
  return (
    <StyledHeader>
      <HeaderMenuBlock>
        {PROJECTS.length ? (
          <HamburgerMenu onClick={toggleProjectsMenu} />
        ) : null}
        <HeaderLogo href="/">{PROJECT_NAME}</HeaderLogo>
        <HeaderMenu $collapsed={!isProjectsMenuOpen} $nbItems={PROJECTS.length}>
          {PROJECTS.map(({name, url}) => (
            <HeaderMenuLink key={`menulink-${name}`} href={url}>
              {name}
            </HeaderMenuLink>
          ))}
        </HeaderMenu>
      </HeaderMenuBlock>
      <HeaderLinksBlock
        style={{
          maxHeight:
            isSmallScreen && isLinksMenuOpen
              ? `${4 * links.length}rem`
              : undefined
        }}
      >
        {/* If the no examples marker, return without creating pages */}
        {links.map((link, index) => (
          <HeaderLinkContainer key={`link-${index}`}>
            <HeaderLink {...link} />
          </HeaderLinkContainer>
        ))}
        {/* this.renderStars() */}

        <div
          className="menu-toggle"
          onClick={() => {
            toggleLinksMenu(!isLinksMenuOpen);
          }}
        >
          {/* currently, this isn't rendered. but this is in place if we want to have
          the links on the header collapsible for small displays */}
          <i className={`icon icon-${isLinksMenuOpen ? 'close' : 'menu'}`} />
        </div>
      </HeaderLinksBlock>
    </StyledHeader>
  );
};

// we are exposing 2 header components. 
// 1 - DocsHeader, which will update the state of the top level layout.
//   we need to expose whether the menu is toggled or not because it could
//   affect how TOC is displayed in smaller screens. 
// 2 - Header, which won't and just maintain its own state.
// both components are wrappers around ControlledHeader.

export class DocsHeader extends Component {
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
    const {links} = this.state;

    return <ControlledHeader links={links} {...this.props} />;
  }

  render() {
    return this.renderHeader();
  }
}

DocsHeader.propTypes = propTypes;

export default class Header extends Component {
  constructor(props) {
    super(props);
    // we need to know the number of links before render.
    // this is not an ideal solution.
    // some of the links which are hardcoded should come from configuration
    // TODO - let's create the links server side, then pass them to the template as props.
    this.state = {
      collapsed: true,
      links: generateHeaderLinks(props)
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({collapsed: !this.state.collapsed});
  }

  // note that rn, we don't render stars per design, but this could change
  renderStars() {
    const {config} = this.props;
    if (config.PROJECT_TYPE === 'github') {
      return (
        <GithubStars project={`${config.PROJECT_ORG}/${config.PROJECT_NAME}`} />
      );
    }

    return null;
  }

  render() {
    const {links, collapsed} = this.state;
    return (
      <ControlledHeader
        {...this.props}
        links={links}
        isLinksMenuOpen={false}
        isProjectsMenuOpen={!collapsed}
        toggleProjectsMenu={this.handleClick}
        toggleLinksMenu={() => {}}
      />
    );
  }
}

Header.propTypes = propTypes;
