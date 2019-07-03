/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
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

import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import chevronDown from '../images/chevron-down_small-filled.svg';
import chevronRight from '../images/chevron-right_small-filled.svg';

import {
  ListHeaderLinkWrapper,
  StyledChevron,
  SubPages,
  SubPagesList,
  TocListItem,
  Toc,
  TocActiveEntryBackground,
  TocFirstEntryInSection,
  TocEntryInSection,
  TocExpandedEntryBackground,
  TocLastEntryInSection,
  TocSoleEntryInSection,
  TocInnerDiv,
  TocLinkWrapper,
  ToggleExpanded,
  ToggleExpandedButton
} from '../styled/index';

function getRouteInfo({route, slug}) {
  if (route.childMarkdownRemark) {
    // if route corresponds to an entry with markdown
    const {fields = {slug: ''}} = route.childMarkdownRemark;
    return {
      // if this route has the same slug that we're testing then
      // all of the chapters/entries that contain it should be open.
      routeContainsSlug: fields.slug === slug,
      // also we will pass the slug to that route up, so we can find
      // the first entry with markdown for a given chapter.
      pathToFirstChild: fields.slug
    };
  }

  // else, we're going to go through children of that route to see
  // if the active route (ie slug of current page) is one of these
  // children.

  // note - why actually go down the route as opposed to just do
  // string operations on slugs? ie checking if '/docs/my-chapter'
  // is included in '/docs/my-chapter/first-article' ? because this
  // is fairly unreliable. ie it's also included in
  // '/docs/my-chapter-2'. This ambiguity has caused issues in ocular.

  const children = route.entries || route.chapters || [];
  return children.reduce(
    (routeInfo, entry) => {
      const {routeContainsSlug, pathToFirstChild} = getRouteInfo({
        route: entry,
        slug
      });
      return {
        // if we haven't found the slug among the children yet,
        // and we find it now, then this route contains the slug:
        routeContainsSlug: routeInfo.routeContainsSlug || routeContainsSlug,
        // the first time we find a route which has markdown, pathToFirstChild
        // will get a truthy value (ie the slug of that route). That value
        // won't change during the reduce
        pathToFirstChild: routeInfo.pathToFirstChild || pathToFirstChild
      };
    },
    {
      routeContainsSlug: false,
      pathToFirstChild: undefined
    }
  );
}

function getHeight(route) {
  // TODO - we must expose the height of TOC items through config.
  return route.entries.reduce(
    (prev, curr) => prev + (curr.entries ? getHeight(curr) : 56),
    0
  );
}

// Creates the image of a chevron, facing right or down as needed

const Chevron = ({collapsed, expanded, style}) => {
  if (expanded) {
    return <StyledChevron alt="chevron-down" src={chevronDown} style={style} />;
  }
  if (collapsed) {
    return (
      <StyledChevron alt="chevron-right" src={chevronRight} style={style} />
    );
  }
  return null;
};

// This component only creates a Link component if clicking on that Link will
// effectively change routes. If no path is passed or if the path is not
// usable then it just renders a div. That should not be the case

const SafeLink = ({
  active,
  collapsed,
  depth,
  expanded,
  name,
  path,
  Wrapper
}) => {
  const style = {
    marginLeft: depth * 30
  };
  // Gatsby <Link> element emmits warning if "external" links are used
  // "internal" links start with `/`
  // https://github.com/gatsbyjs/gatsby/issues/11243
  if (path && !path.startsWith('/')) {
    path = `/${path}`; // eslint-disable-line
  }
  return (
    // <div className={classNames(className, {active, expanded})} title={name}>

    <Wrapper>
      <Link
        to={path}
        style={{width: '100%', height: '100%', color: 'inherit'}}
      >
        {active && !expanded ? (
          <TocActiveEntryBackground />
        ) : expanded ? (
          <TocExpandedEntryBackground />
        ) : null}
        <Chevron collapsed={collapsed} expanded={expanded} style={style} />
        {!path || typeof path !== 'string' ? (
          <span style={style}>{name}</span>
        ) : (
          <div to={path} title={name} style={style}>
            {name}
          </div>
        )}
      </Link>
    </Wrapper>
  );
};

const renderRoute = ({route, index, isLast, depth, slug, fullyExpanded}) => {
  const routeInfo = getRouteInfo({route, slug});

  if (route.chapters) {
    const name = route.title;
    const active = routeInfo.routeContainsSlug;
    return (
      <div key={index} className="section">
        <SafeLink
          depth={depth}
          active={active}
          collapsed={!fullyExpanded && !active}
          expanded={fullyExpanded || active}
          Wrapper={ListHeaderLinkWrapper}
          name={name}
          path={routeInfo.pathToFirstChild}
        />
        <SubPages
          style={{
            ...(!active && !fullyExpanded ? {maxHeight: 0} : {})
          }}
        >
          <SubPagesList>
            {route.chapters.map((r, idx) =>
              renderRoute({
                route: r,
                index: idx,
                isLast: idx === route.chapters.length - 1,
                depth: depth + 1,
                slug,
                fullyExpanded
              })
            )}
          </SubPagesList>
        </SubPages>
      </div>
    );
  }

  if (route.entries) {
    const name = route.title;
    const active = routeInfo.routeContainsSlug;
    return (
      <div key={index} className="section">
        <SafeLink
          Wrapper={ListHeaderLinkWrapper}
          collapsed={!fullyExpanded && !active}
          expanded={fullyExpanded || active}
          active={active}
          depth={depth}
          name={name}
          path={routeInfo.pathToFirstChild}
        />
        <SubPages
          style={{
            maxHeight: active || fullyExpanded ? getHeight(route) : 0
          }}
        >
          <SubPagesList>
            {route.entries.map((childRoute, idx) => {
              if (!childRoute.childMarkdownRemark) {
                console.warn(
                  `Missing content for entry ${idx} in chapter ${route.title}`,
                  route
                );
              }
              return renderRoute({
                route: childRoute,
                fullyExpanded,
                isLast: idx === route.entries.length - 1,
                index: idx,
                depth: depth + 1,
                slug
              });
            })}
          </SubPagesList>
        </SubPages>
      </div>
    );
  }

  const remark = route.childMarkdownRemark;
  const name = remark && remark.frontmatter && remark.frontmatter.title;
  const target = remark && remark.fields && remark.fields.slug;
  const Entry =
    index === 0
      ? isLast
        ? TocSoleEntryInSection
        : TocFirstEntryInSection
      : isLast
      ? TocLastEntryInSection
      : TocEntryInSection;
  return (
    <Entry key={index}>
      <TocListItem>
        <SafeLink
          active={target === slug}
          depth={depth}
          className="link"
          name={name}
          path={target}
          Wrapper={TocLinkWrapper}
        />
      </TocListItem>
    </Entry>
  );
};

export default class TableOfContents extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullyExpanded: false
    };
  }

  toggleExpanded() {
    const {fullyExpanded} = this.state;
    this.setState({fullyExpanded: !fullyExpanded});
  }

  render() {
    const {chapters: tree, slug} = this.props;
    const {fullyExpanded} = this.state;
    if (!tree) {
      return null;
    }
    return (
      <Toc>
        {/* <div className={classNames('toc', {open}, className)}> */}
        <TocInnerDiv>
          {/* <div> */}
          <ToggleExpanded>
            {/* <div
            className={classNames('toggle-expanded', {
              expanded: fullyExpanded
            })}
          > */}
            {/* <button */}
            <ToggleExpandedButton
              onClick={() => this.toggleExpanded()}
              onKeyPress={() => this.toggleExpanded()}
              type="button"
            >
              {fullyExpanded
                ? 'Collapse table of contents'
                : 'Expand table of contents'}
            </ToggleExpandedButton>
          </ToggleExpanded>
          {tree.map((route, index) =>
            renderRoute({
              route,
              index,
              depth: 0,
              slug,
              fullyExpanded
            })
          )}
        </TocInnerDiv>
      </Toc>
    );
  }
}

/*
@connect(({ router: { location: { pathname } }, ui: { isMenuOpen } }) => ({
  pathname,
  open: isMenuOpen,
  tree: trees[getRootPath(pathname)] && trees[getRootPath(pathname)].tree
}))
class Toc extends PureComponent {
  render() {
    const { className, open, tree, pathname } = this.props

    if (!tree) {
      return null
    }
    return (
      <div className={cx('toc', { open }, className)}>
        <div>{tree.map((route, i) => renderRoute(route, i, pathname, 0))}</div>
      </div>
    )
  }
}

export default Toc
*/
