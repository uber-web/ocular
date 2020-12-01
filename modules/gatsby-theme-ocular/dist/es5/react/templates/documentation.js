"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.query = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _markdown = _interopRequireDefault(require("../components/markdown"));

var _typography = require("../styled/typography");

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var query = (0, _gatsby.graphql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  query DocBySlug($slug: String!) {\n    docBySlug: mdx(fields: {slug: {eq: $slug}}) {\n      body\n      timeToRead\n      excerpt\n      frontmatter {\n        title\n      }\n    }\n  }\n"])));
exports.query = query;

var DocTemplate = function (_React$Component) {
  (0, _inherits2.default)(DocTemplate, _React$Component);

  var _super = _createSuper(DocTemplate);

  function DocTemplate() {
    (0, _classCallCheck2.default)(this, DocTemplate);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(DocTemplate, [{
    key: "render",
    value: function render() {
      var body = this.props.data.docBySlug.body;
      var relativeLinks = this.props.pageContext.relativeLinks;
      return _react.default.createElement("div", {
        style: {
          position: 'relative'
        }
      }, _react.default.createElement(_typography.MarkdownBody, null, _react.default.createElement(_markdown.default, {
        path: this.props.location.pathname,
        relativeLinks: relativeLinks,
        config: this.props.config,
        body: body
      })));
    }
  }]);
  return DocTemplate;
}(_react.default.Component);

exports.default = DocTemplate;
//# sourceMappingURL=documentation.js.map