"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _websiteConfig = _interopRequireDefault(require("../components/website-config"));

var _githubContributors = _interopRequireDefault(require("../components/github-contributors"));

var _markdown = _interopRequireDefault(require("../components/markdown"));

var _home = require("../styled/home");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function renderPage(_ref) {
  var config = _ref.config,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? 'dark' : _ref$theme,
      HeroExample = _ref.HeroExample,
      content = _ref.content,
      children = _ref.children;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_home.Banner, {
    colortheme: theme
  }, _react.default.createElement(_home.HeroExampleContainer, null, HeroExample && _react.default.createElement(HeroExample, null)), _react.default.createElement(_home.BannerContainer, null, _react.default.createElement(_home.ProjectName, null, config.PROJECT_NAME), _react.default.createElement("p", null, config.PROJECT_DESC), _react.default.createElement(_home.GetStartedLink, {
    to: config.LINK_TO_GET_STARTED,
    colortheme: theme
  }, "GET STARTED"))), content && _react.default.createElement(_home.Section, null, _react.default.createElement(_home.Container, null, _react.default.createElement(_markdown.default, {
    body: content.body
  }))), children, config.PROJECT_TYPE === 'github' && _react.default.createElement(_home.Section, null, _react.default.createElement(_home.Container, null, _react.default.createElement(_githubContributors.default, {
    project: "".concat(config.PROJECT_ORG, "/").concat(config.PROJECT_NAME)
  }))), _react.default.createElement(_home.Footer, null, _react.default.createElement(_home.Container, null, config.PROJECT_ORG_LOGO && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_home.FooterText, null, "Made by"), _react.default.createElement(_home.FooterLogo, {
    src: "".concat(config.PROJECT_ORG_LOGO),
    alt: "logo"
  })))));
}

var IndexPage = function (_Component) {
  (0, _inherits2.default)(IndexPage, _Component);

  var _super = _createSuper(IndexPage);

  function IndexPage() {
    (0, _classCallCheck2.default)(this, IndexPage);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(IndexPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          HeroExample = _this$props.HeroExample,
          theme = _this$props.theme,
          pageContext = _this$props.pageContext,
          children = _this$props.children;
      return _react.default.createElement("main", null, _react.default.createElement(_websiteConfig.default, null, function (_ref2) {
        var config = _ref2.config;
        return renderPage({
          config: config,
          HeroExample: HeroExample,
          theme: theme,
          content: pageContext && pageContext.content,
          children: children
        });
      }));
    }
  }]);
  return IndexPage;
}(_react.Component);

exports.default = IndexPage;
//# sourceMappingURL=home.js.map