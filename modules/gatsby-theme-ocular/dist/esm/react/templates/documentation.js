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
import { graphql } from 'gatsby';
import Markdown from '../components/markdown';
import { MarkdownBody } from '../styled/typography';
export var query = graphql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query DocBySlug($slug: String!) {\n    docBySlug: mdx(fields: {slug: {eq: $slug}}) {\n      body\n      timeToRead\n      excerpt\n      frontmatter {\n        title\n      }\n    }\n  }\n"])));

var DocTemplate = function (_React$Component) {
  _inherits(DocTemplate, _React$Component);

  var _super = _createSuper(DocTemplate);

  function DocTemplate() {
    _classCallCheck(this, DocTemplate);

    return _super.apply(this, arguments);
  }

  _createClass(DocTemplate, [{
    key: "render",
    value: function render() {
      var body = this.props.data.docBySlug.body;
      var relativeLinks = this.props.pageContext.relativeLinks;
      return React.createElement("div", {
        style: {
          position: 'relative'
        }
      }, React.createElement(MarkdownBody, null, React.createElement(Markdown, {
        path: this.props.location.pathname,
        relativeLinks: relativeLinks,
        config: this.props.config,
        body: body
      })));
    }
  }]);

  return DocTemplate;
}(React.Component);

export { DocTemplate as default };
//# sourceMappingURL=documentation.js.map