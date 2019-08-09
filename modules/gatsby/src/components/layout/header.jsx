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

  renderStars() {
    const {config} = this.props;
    if (config.PROJECT_TYPE === 'github') {
      return (
        <GithubStars project={`${config.PROJECT_ORG}/${config.PROJECT_NAME}`} />
      );
    }

    return null;
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
    const {PROJECT_NAME, PROJECTS = []} = config;

    const {links} = this.state;

    return (
      <StyledHeader>
        <HeaderMenuBlock>
          {PROJECTS.length ? (
            <HamburgerMenu onClick={this.handleClick} />
          ) : null}
          <HeaderLogo href="/">{PROJECT_NAME}</HeaderLogo>
          <HeaderMenu
            $collapsed={this.state.collapsed}
            $nbItems={PROJECTS.length}
          >
            {PROJECTS.map(({name, url}) => (
              <HeaderMenuLink key={name} href={url}>
                {name}
              </HeaderMenuLink>
            ))}
          </HeaderMenu>
        </HeaderMenuBlock>

        <HeaderLinksBlock
          style={{
            maxHeight:
              isSmallScreen && isMenuOpen ? `${4 * links.length}rem` : undefined
          }}
        >
          {/* If the no examples marker, return without creating pages */}
          {links.map((link, index) => (
            <HeaderLinkContainer>
              <HeaderLink {...link} key={index} />
            </HeaderLinkContainer>
          ))}
          {/* this.renderStars() */}

          <div
            className="menu-toggle"
            onClick={() => this.props.toggleMenu(!isMenuOpen)}
          >
            <i className={`icon icon-${isMenuOpen ? 'close' : 'menu'}`} />
          </div>
        </HeaderLinksBlock>
      </StyledHeader>
    );
  }

  render() {
    return this.renderHeader();
  }
}

Header.propTypes = propTypes;
