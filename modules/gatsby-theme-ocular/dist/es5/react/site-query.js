"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var QUERY = (0, _gatsby.graphql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  fragment SiteConfigFragment on Site {\n    siteMetadata {\n      config {\n        PROJECT_NAME\n        PROJECT_TYPE\n        PROJECT_DESC\n        PROJECT_URL\n        PROJECT_ORG\n        PROJECT_IMAGE\n        PROJECT_ORG_LOGO\n        HEADER_LINK_URL\n        LINK_TO_GET_STARTED\n        PATH_PREFIX\n        GA_TRACKING_ID\n        EXAMPLES {\n          title\n          path\n        }\n        THEME_OVERRIDES\n        STYLESHEETS\n        PROJECTS {\n          name\n          url\n        }\n        ADDITIONAL_LINKS {\n          name\n          href\n          index\n        }\n        HOME_PATH\n      }\n    }\n  }\n\n  fragment MarkdownNodeFragment on Mdx {\n    id\n    fields {\n      slug\n    }\n    frontmatter {\n      title\n    }\n    headings(depth: h1) {\n      value\n    }\n  }\n\n  query ConfigQuery {\n    site {\n      ...SiteConfigFragment\n    }\n\n    tableOfContents: docsJson {\n      chapters {\n        title\n        level\n        chapters {\n          title\n          level\n          entries {\n            childMdx {\n              frontmatter {\n                title\n              }\n              fields {\n                slug\n              }\n              headings {\n                value\n              }\n            }\n          }\n        }\n        entries {\n          childMdx {\n            frontmatter {\n              title\n            }\n            fields {\n              slug\n            }\n            headings {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n"])));

var SiteQuery = function (_React$Component) {
  (0, _inherits2.default)(SiteQuery, _React$Component);

  var _super = _createSuper(SiteQuery);

  function SiteQuery() {
    (0, _classCallCheck2.default)(this, SiteQuery);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(SiteQuery, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.default.createElement(_gatsby.StaticQuery, {
        query: QUERY,
        render: children
      });
    }
  }]);
  return SiteQuery;
}(_react.default.Component);

exports.default = SiteQuery;
//# sourceMappingURL=site-query.js.map