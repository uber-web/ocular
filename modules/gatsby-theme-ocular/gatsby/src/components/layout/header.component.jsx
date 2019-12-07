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

import React from 'react';
import PropTypes from 'prop-types';
import GithubIcon from 'react-icons/lib/go/mark-github';

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

export const propTypes = {
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
export function generateHeaderLinks(props) {
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

export default ControlledHeader;
