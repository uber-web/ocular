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

import {TocChevron, TocHeader, TocLink, TocEntry, TocSubpages} from '../styled';

export default class TableOfContents extends PureComponent {
  constructor(props) {
    super(props);
    const {slug, chapters, firstItemIsExpanded} = props;
    const expanded = firstItemIsExpanded ? {0: true} : {};
    const tocState = getTocState({slug, chapters, expanded});

    // tocState contains the state of the TOC with information such as
    // what is the current height of an entry?
    // is an entry selected or is any of its children selected?
    // expanded records whether the user manually expanded or collapsed
    // a section of the TOC.
    // why keep them separated? tocState get regenerated for instance
    // when the slug changes (which may mean that some sections get expanded/collapsed)
    // we don't want to overwrite the manual actions of the user in that case.
    // instead, we first apply the "organic" changes of the toc, then on top of that
    // we add the results of the user's action

    this.state = {
      tocState,
      expanded
    };
    this.toggleEntry = this.toggleEntry.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      const {chapters, slug} = this.props;
      const {expanded} = this.state;
      const tocState = getTocState({chapters, slug, expanded});
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tocState,
        expanded
      });
    }
  }

  toggleEntry(id) {
    const {expanded, tocState} = this.state;
    let updatedExpanded = {...expanded};
    const entry = tocState[id];

    // if this entry has been manually expanded, then we manually collapse it.
    // else - either this entry has never been manually expanded/collapsed,
    // or it has been manually collapsed - we expand it.
    updatedExpanded[id] = !isOpen(entry, expanded);
    // then we need to update the heights.
    let updatedTocState = updateHeights({...tocState}, updatedExpanded);

    this.setState({
      tocState: updatedTocState,
      expanded: updatedExpanded
    });
  }

  render() {
    const {chapters: tree, slug} = this.props;

    if (!tree) {
      return null;
    }
    return (
      <ControlledToc
        tree={tree}
        tocState={this.state.tocState}
        toggleEntry={this.toggleEntry}
      />
    );
  }
}

// util functions to pre-process the TOC

function getTocState({chapters, slug, expanded}) {
  // we try to generate the height of each toc entry and whether it's expanded
  // or not based on the toc structure (chapters), whether some entries are
  // manually expanded or not (open) and what's the current page (slug)

  // there may be a lot of code but this goes very fast even for long tocs.

  // one way to uniquely identify entries is by creating an id made of the
  // index position of all of its parents and itself.
  // ie [2, 0, 1] - 3nd chapter, 1st entry, 2nd item.

  const entries = {};
  let queue = chapters.map((chapter, i) => ({
    ...chapter,
    id: [i],
    parents: []
  }));
  while (queue.length) {
    const current = queue.shift();
    const id = current.id;
    entries[id] = {id};

    const children = (current.chapters || current.entries || []).map(
      (child, i) => ({
        ...child,
        id: id.concat(i),
        parents: [...current.parents, id]
      })
    );
    if (children.length) {
      entries[id].children = children.map(c => c.id);
    }
    children.forEach(c => queue.push(c));
    if (current.childMarkdownRemark) {
      // only happens for leave nodes
      current.parents.forEach(parent => {
        if (current.childMarkdownRemark.fields.slug === slug) {
          entries[parent].childIsSelected = true;
        }
        // currently the behavior of entries is to toggle them
        // if we switch to using them as link to the first child (as before)
        // we can just uncomment that line
        // entries[parent].pathToFirstChild = current.childMarkdownRemark.fields.slug;
      });
      entries[id].isSelected = current.childMarkdownRemark.fields.slug === slug;
    }
  }
  return updateHeights(entries, expanded);
}

function isOpen(entry, expanded) {
  // this is all the reasons why a given toc entry with children could
  // be expanded.
  // either it's manually expanded, or it's on the active route and
  // it's not manually collapsed.
  return (
    expanded[entry.id] === true ||
    (entry.childIsSelected && expanded[entry.id] !== false)
  );
}

function updateHeights(tocEntries, expanded) {
  // at this stage we know which entries are expanded or not, whether manually
  // or because they contain the active page. now let's compute their heights

  // why is it important to compute heights? because without an an absolute
  // number we can't transition on height and have smooth collapse effects.

  Object.values(tocEntries).forEach(tocEntry => {
    if (tocEntry.children) {
      if (isOpen(tocEntry, expanded)) {
        let queue = [tocEntry];
        let height = -1;
        while (queue.length) {
          const current = queue.shift();
          height = height + 1;
          if (isOpen(current, expanded)) {
            current.children.forEach(c => queue.push(tocEntries[c]));
          }
        }
        tocEntry.height = height;
      } else {
        tocEntry.height = 0;
      }
    }
  });
  return tocEntries;
}

// sub components of the TOC

// This component only creates a Link component if clicking on that Link will
// effectively change routes. If no path is passed or if the path is not
// usable then it just renders a div. That should not be the case

const SafeLink = ({
  active,
  depth,
  hasChildren,
  isTocOpen,
  id,
  name,
  path,
  toggleEntry = () => {}
}) => {
  // Gatsby <Link> element emmits warning if "external" links are used
  // "internal" links start with `/`
  // https://github.com/gatsbyjs/gatsby/issues/11243
  if (path && !path.startsWith('/')) {
    path = `/${path}`; // eslint-disable-line
  }

  return (
    <TocEntry $depth={depth} title={name} onClick={() => toggleEntry(id)}>
      {hasChildren && <TocChevron $depth={depth} $isTocOpen={isTocOpen} />}
      {!path || typeof path !== 'string' ? (
        <TocHeader $depth={depth}>{name}</TocHeader>
      ) : (
        <TocLink $depth={depth} to={path} title={name} $active={active}>
          {name}
        </TocLink>
      )}
    </TocEntry>
  );
};

const renderRoute = ({route, id, index, depth, tocState, toggleEntry}) => {
  const children = route.chapters || route.entries || [];
  const updatedId = id.concat(index);

  // parts of the TOC with children

  if (children.length) {
    const name = route.title;
    const routeInfo = tocState[updatedId];
    return (
      <div key={index}>
        <SafeLink
          depth={depth}
          hasChildren
          isTocOpen={routeInfo && routeInfo.height > 0}
          id={updatedId}
          name={name}
          /* uncomment to have the entry act as link to its first child */
          /* path={routeInfo && routeInfo.pathToFirstChild} */
          toggleEntry={toggleEntry}
        />
        <TocSubpages $height={routeInfo && routeInfo.height}>
          {children.map((childRoute, idx) => {
            if (!childRoute.childMarkdownRemark) {
              console.warn(
                `Missing content for entry ${idx} in chapter ${route.title}`,
                route
              );
            }

            return renderRoute({
              depth: depth + 1,
              id: updatedId,
              index: idx,
              route: childRoute,
              tocState,
              toggleEntry
            });
          })}
        </TocSubpages>
      </div>
    );
  }

  // leaves

  const remark = route.childMarkdownRemark;
  // first syntax is toc for documentation, second is toc for examples
  const name =
    (remark && remark.frontmatter && remark.frontmatter.title) || route.title;
  const target = (remark && remark.fields && remark.fields.slug) || route.path;
  return (
    <div key={index}>
      <li>
        <SafeLink
          active={
            tocState[updatedId] && tocState[updatedId].isSelected === true
          }
          depth={depth}
          name={name}
          path={target}
        />
      </li>
    </div>
  );
};

const ControlledToc = ({tree, tocState, toggleEntry}) => {
  return (
    <>
      {tree.map((route, index) =>
        renderRoute({
          route,
          index,
          depth: 0,
          tocState,
          toggleEntry,
          id: []
        })
      )}
    </>
  );
};
