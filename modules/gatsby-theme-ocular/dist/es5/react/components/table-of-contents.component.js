"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _toc = require("../styled/toc");

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

  return _react.default.createElement(_toc.TocEntry, {
    $depth: depth,
    $index: index,
    title: name,
    onClick: function onClick() {
      return toggleEntry(id);
    }
  }, hasChildren && _react.default.createElement(_toc.TocChevron, {
    $depth: depth,
    $isTocOpen: isTocOpen
  }), !path || typeof path !== 'string' ? _react.default.createElement(_toc.TocHeader, {
    $depth: depth
  }, name) : _react.default.createElement(_toc.TocLink, {
    $depth: depth,
    $active: active
  }, _react.default.createElement(_gatsby.Link, {
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
    return _react.default.createElement("div", {
      key: index
    }, _react.default.createElement(SafeLink, {
      depth: depth,
      index: index,
      hasChildren: true,
      isTocOpen: routeInfo && routeInfo.height > 0,
      id: updatedId,
      name: _name,
      toggleEntry: toggleEntry
    }), _react.default.createElement(_toc.TocSubpages, {
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
  return _react.default.createElement("div", {
    key: index
  }, _react.default.createElement("li", null, _react.default.createElement(SafeLink, {
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
  return _react.default.createElement(_react.default.Fragment, null, tree.map(function (route, index) {
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

var _default = ControlledToc;
exports.default = _default;
//# sourceMappingURL=table-of-contents.component.js.map