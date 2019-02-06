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

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import chevronDown from '../images/chevron-down_small-filled.svg';
import chevronRight from '../images/chevron-right_small-filled.svg';

function getRouteInfo({ route, slug }) {
  if (route.childMarkdownRemark) {
    // if route corresponds to an entry with markdown
    const { fields = { slug: '' } } = route.childMarkdownRemark;
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
      const { routeContainsSlug, pathToFirstChild } = getRouteInfo({
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

const Chevron = ({ collapsed, expanded, style }) => {
  if (expanded) {
    return <img alt="chevron-down" src={chevronDown} style={style} />;
  }
  if (collapsed) {
    return <img alt="chevron-right" src={chevronRight} style={style} />;
  }
  return null;
};

// This component only creates a Link component if clicking on that Link will
// effectively change routes. If no path is passed or if the path is not
// usable then it just renders a div. That should not be the case

const SafeLink = ({
  active,
  className,
  collapsed,
  depth,
  expanded,
  name,
  path
}) => {
  const style = {
    marginLeft: depth * 30
  };

  return (
    <div className={classNames(className, { active, expanded })} title={name}>
      <Chevron collapsed={collapsed} expanded={expanded} style={style} />
      {!path || typeof path !== 'string' ? (
        <span style={style}>name</span>
      ) : (
        <Link to={path} title={name} style={style}>
          {name}
        </Link>
      )}
    </div>
  );
};

const renderRoute = ({ route, index, depth, slug, fullyExpanded }) => {
  const routeInfo = getRouteInfo({ route, slug });

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
          className="list-header"
          name={name}
          path={routeInfo.pathToFirstChild}
        />
        <div className="subpages">
          <ul>
            {route.chapters.map((r, idx) =>
              renderRoute({
                route: r,
                index: idx,
                depth: depth + 1,
                slug,
                fullyExpanded
              })
            )}
          </ul>
        </div>
      </div>
    );
  }

  if (route.entries) {
    const name = route.title;
    const active = routeInfo.routeContainsSlug;
    return (
      <div key={index} className="section">
        <SafeLink
          className="list-header"
          collapsed={!fullyExpanded && !active}
          expanded={fullyExpanded || active}
          active={active}
          depth={depth}
          name={name}
          path={routeInfo.pathToFirstChild}
        />
        <div
          className="subpages subpages-entries"
          style={{ maxHeight: getHeight(route) }}
        >
          <ul>
            {route.entries.map((r, idx) =>
              renderRoute({
                route: r,
                fullyExpanded,
                index: idx,
                depth: depth + 1,
                slug
              })
            )}
          </ul>
        </div>
      </div>
    );
  }

  const remark = route.childMarkdownRemark;
  const name = remark && remark.frontmatter && remark.frontmatter.title;
  const target = remark && remark.fields && remark.fields.slug;
  return (
    <div key={index}>
      <li>
        <SafeLink
          active={target === slug}
          depth={depth}
          className="link"
          name={name}
          path={target}
        />
      </li>
    </div>
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
    const { fullyExpanded } = this.state;
    this.setState({ fullyExpanded: !fullyExpanded });
  }

  render() {
    const { chapters: tree, className, open, slug } = this.props;
    const { fullyExpanded } = this.state;
    if (!tree) {
      return null;
    }
    return (
      <div className={classNames('toc', { open }, className)}>
        <div>
          <div
            className={classNames('toggle-expanded', {
              expanded: fullyExpanded
            })}
          >
            <button
              onClick={this.toggleExpanded.bind(this)}
              onKeyPress={this.toggleExpanded.bind(this)}
              type="button"
            >
              {fullyExpanded
                ? 'Collapse table of contents'
                : 'Expand table of contents'}
            </button>
          </div>
          {tree.map((route, index) =>
            renderRoute({
              route,
              index,
              depth: 0,
              slug,
              fullyExpanded
            })
          )}
        </div>
      </div>
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
