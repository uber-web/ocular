import React from 'react';
import { Link } from 'gatsby';
import { TocChevron, TocHeader, TocLink, TocEntry, TocSubpages } from '../styled/toc';

var SafeLink = function SafeLink(_ref) {
  var active = _ref.active,
      depth = _ref.depth,
      index = _ref.index,
      hasChildren = _ref.hasChildren,
      isTocOpen = _ref.isTocOpen,
      id = _ref.id,
      name = _ref.name,
      path = _ref.path,
      _ref$toggleEntry = _ref.toggleEntry,
      toggleEntry = _ref$toggleEntry === void 0 ? function () {} : _ref$toggleEntry;

  if (path && !path.startsWith('/')) {
    path = "/".concat(path);
  }

  return React.createElement(TocEntry, {
    $depth: depth,
    $index: index,
    title: name,
    onClick: function onClick() {
      return toggleEntry(id);
    }
  }, hasChildren && React.createElement(TocChevron, {
    $depth: depth,
    $isTocOpen: isTocOpen
  }), !path || typeof path !== 'string' ? React.createElement(TocHeader, {
    $depth: depth
  }, name) : React.createElement(TocLink, {
    $depth: depth,
    $active: active
  }, React.createElement(Link, {
    to: path,
    title: name
  }, name)));
};

var renderRoute = function renderRoute(_ref2) {
  var route = _ref2.route,
      id = _ref2.id,
      index = _ref2.index,
      depth = _ref2.depth,
      tocState = _ref2.tocState,
      toggleEntry = _ref2.toggleEntry;
  var children = route.chapters || route.entries || [];
  var updatedId = id.concat(index);

  if (children.length) {
    var _name = route.title;
    var routeInfo = tocState[updatedId];
    return React.createElement("div", {
      key: index
    }, React.createElement(SafeLink, {
      depth: depth,
      index: index,
      hasChildren: true,
      isTocOpen: routeInfo && routeInfo.height > 0,
      id: updatedId,
      name: _name,
      toggleEntry: toggleEntry
    }), React.createElement(TocSubpages, {
      $height: routeInfo && routeInfo.height
    }, children.map(function (childRoute, idx) {
      return renderRoute({
        depth: depth + 1,
        id: updatedId,
        index: idx,
        route: childRoute,
        tocState: tocState,
        toggleEntry: toggleEntry
      });
    })));
  }

  var remark = route.childMdx;
  var name = remark && remark.frontmatter && remark.frontmatter.title || route.title;
  var target = remark && remark.fields && remark.fields.slug || route.path;
  return React.createElement("div", {
    key: index
  }, React.createElement("li", null, React.createElement(SafeLink, {
    active: tocState[updatedId] && tocState[updatedId].isSelected === true,
    depth: depth,
    name: name,
    path: target
  })));
};

var ControlledToc = function ControlledToc(_ref3) {
  var tree = _ref3.tree,
      tocState = _ref3.tocState,
      toggleEntry = _ref3.toggleEntry;
  return React.createElement(React.Fragment, null, tree.map(function (route, index) {
    return renderRoute({
      route: route,
      index: index,
      depth: 0,
      tocState: tocState,
      toggleEntry: toggleEntry,
      id: []
    });
  }));
};

export default ControlledToc;
//# sourceMappingURL=table-of-contents.component.js.map