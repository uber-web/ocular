"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _gatsbyPluginMdx = require("gatsby-plugin-mdx");

var _react2 = require("@mdx-js/react");

var _typography = require("../styled/typography");

var _linksUtils = require("../../utils/links-utils.js");

var _excluded = ["href"],
    _excluded2 = ["children"],
    _excluded3 = ["id"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CustomLinkWrapper = function CustomLinkWrapper(path, relativeLinks, config) {
  var CustomLink = function CustomLink(_ref) {
    var href = _ref.href,
        props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var updatedLink = (0, _linksUtils.parseLinks)(href, path, relativeLinks, config);
    return updatedLink ? _react.default.createElement(_typography.GatsbyA, (0, _extends2.default)({
      to: updatedLink
    }, props)) : _react.default.createElement(_typography.A, (0, _extends2.default)({
      href: href
    }, props));
  };

  return CustomLink;
};

var CustomPre = function CustomPre(props) {
  var children = props.children,
      otherProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
  return _react.default.createElement(_typography.Pre, otherProps, _react.default.Children.map(children, function (child) {
    if (child.type === 'code' || child.type.displayName === 'Styled(code)') {
      return _react.default.createElement(_typography.CodeBlock, child.props);
    }

    return _react.default.cloneElement(child);
  }));
};

var API_REGEX = /^code-classlanguage-text(.*?)code/;
var CODE_REGEX = /code-classlanguage-text(.*?)code/g;

var CustomHeader = function CustomHeader(ComponentType, id, props, anchors) {
  if (!id) {
    return _react.default.createElement(ComponentType, props);
  }

  if (API_REGEX.test(id)) {
    id = id.match(API_REGEX)[1];
  } else {
    id = id.replace(CODE_REGEX, function ($0, $1) {
      return $1;
    });
  }

  if (anchors[id]) {
    var suffix = 1;

    while (anchors["".concat(id, "-").concat(suffix)]) {
      suffix++;
    }

    id = "".concat(id, "-").concat(suffix);
  }

  anchors[id] = true;
  var children = props.children.slice();
  var autolink = children[0];

  if (autolink.props && autolink.props.href) {
    children[0] = (0, _react.cloneElement)(autolink, {
      key: 'anchor',
      href: "#".concat(id)
    });
  }

  return _react.default.createElement(ComponentType, (0, _extends2.default)({}, props, {
    id: id
  }), children);
};

var _default = function _default(props) {
  var relativeLinks = props.relativeLinks,
      path = props.path,
      config = props.config;
  var anchors = {};

  var HeaderWrapper = function HeaderWrapper(ComponentType) {
    return function (_ref2) {
      var id = _ref2.id,
          props = (0, _objectWithoutProperties2.default)(_ref2, _excluded3);
      return CustomHeader(ComponentType, id, props, anchors);
    };
  };

  var components = {
    h1: _typography.H1,
    h2: HeaderWrapper(_typography.H2),
    h3: HeaderWrapper(_typography.H3),
    h4: HeaderWrapper(_typography.H4),
    h5: HeaderWrapper(_typography.H5),
    h6: HeaderWrapper(_typography.H6),
    p: _typography.P,
    ul: _typography.List,
    li: _typography.ListItem,
    pre: CustomPre,
    img: _typography.Img,
    code: _typography.InlineCode,
    table: _typography.Table,
    th: _typography.TableHeaderCell,
    td: _typography.TableBodyCell,
    blockquote: _typography.BlockQuote,
    a: relativeLinks ? CustomLinkWrapper(path, relativeLinks, config) : _typography.A
  };
  return _react.default.createElement(_react2.MDXProvider, {
    components: components
  }, _react.default.createElement(_gatsbyPluginMdx.MDXRenderer, null, props.body));
};

exports.default = _default;
//# sourceMappingURL=markdown.js.map