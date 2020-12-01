import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
var QUERY = graphql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  fragment SiteConfigFragment on Site {\n    siteMetadata {\n      config {\n        PROJECT_NAME\n        PROJECT_TYPE\n        PROJECT_DESC\n        PROJECT_URL\n        PROJECT_ORG\n        PROJECT_IMAGE\n        PROJECT_ORG_LOGO\n        HEADER_LINK_URL\n        LINK_TO_GET_STARTED\n        PATH_PREFIX\n        GA_TRACKING_ID\n        EXAMPLES {\n          title\n          path\n        }\n        THEME_OVERRIDES\n        STYLESHEETS\n        PROJECTS {\n          name\n          url\n        }\n        ADDITIONAL_LINKS {\n          name\n          href\n          index\n        }\n        HOME_PATH\n      }\n    }\n  }\n\n  fragment MarkdownNodeFragment on Mdx {\n    id\n    fields {\n      slug\n    }\n    frontmatter {\n      title\n    }\n    headings(depth: h1) {\n      value\n    }\n  }\n\n  query ConfigQuery {\n    site {\n      ...SiteConfigFragment\n    }\n\n    tableOfContents: docsJson {\n      chapters {\n        title\n        level\n        chapters {\n          title\n          level\n          entries {\n            childMdx {\n              frontmatter {\n                title\n              }\n              fields {\n                slug\n              }\n              headings {\n                value\n              }\n            }\n          }\n        }\n        entries {\n          childMdx {\n            frontmatter {\n              title\n            }\n            fields {\n              slug\n            }\n            headings {\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n"])));

var SiteQuery = function (_React$Component) {
  _inherits(SiteQuery, _React$Component);

  var _super = _createSuper(SiteQuery);

  function SiteQuery() {
    _classCallCheck(this, SiteQuery);

    return _super.apply(this, arguments);
  }

  _createClass(SiteQuery, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.createElement(StaticQuery, {
        query: QUERY,
        render: children
      });
    }
  }]);

  return SiteQuery;
}(React.Component);

export { SiteQuery as default };
//# sourceMappingURL=site-query.js.map