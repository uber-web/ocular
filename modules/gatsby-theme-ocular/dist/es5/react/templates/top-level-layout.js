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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

var _reactResponsive = _interopRequireDefault(require("react-responsive"));

var _styledComponents = require("styled-components");

var _gatsby = require("gatsby");

var _websiteConfig = require("../components/website-config");

var _SEO = _interopRequireDefault(require("../components/SEO"));

var _tableOfContents = _interopRequireDefault(require("../components/table-of-contents"));

var _header = _interopRequireDefault(require("../components/header"));

var _docsHeader = _interopRequireDefault(require("../components/docs-header"));

var _defaultTheme = _interopRequireDefault(require("../default-theme"));

var _createTheme = _interopRequireDefault(require("../styled/create-theme"));

var _body = require("../styled/body");

var _header2 = require("../styled/header");

var _toc = require("../styled/toc");

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  body {\n    margin: 0;\n    overflow-x: hidden;\n    -webkit-text-size-adjust: 100%;\n  }\n  * {\n    box-sizing: border-box;\n  }\n"])));

function ResponsiveHeader(props) {
  var HeaderComponent = props.isDocHeader ? _docsHeader.default : _header.default;
  return _react.default.createElement("div", null, _react.default.createElement(_reactResponsive.default, {
    maxWidth: 768
  }, _react.default.createElement(HeaderComponent, (0, _extends2.default)({}, props, {
    isSmallScreen: true
  }))), _react.default.createElement(_reactResponsive.default, {
    minWidth: 769
  }, _react.default.createElement(HeaderComponent, props)));
}

var Layout = function (_React$Component) {
  (0, _inherits2.default)(Layout, _React$Component);

  var _super = _createSuper(Layout);

  function Layout(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Layout);
    _this = _super.call(this, props);
    _this.state = {
      isMenuOpen: false,
      isTocOpen: false
    };
    return _this;
  }

  (0, _createClass2.default)(Layout, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.pageContext.slug !== this.props.pageContext.slug) {
        this.setState({
          isTocOpen: false,
          isMenuOpen: false
        });
      }
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      var config = this.props.config;
      var primitives = Object.assign({}, _defaultTheme.default);

      if (config.THEME_OVERRIDES) {
        Object.assign(primitives, JSON.parse(config.THEME_OVERRIDES));
      }

      return (0, _createTheme.default)(primitives);
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu(on) {
      this.setState({
        isMenuOpen: on
      });
    }
  }, {
    key: "toggleToc",
    value: function toggleToc(on) {
      this.setState({
        isTocOpen: on
      });
    }
  }, {
    key: "renderBodyWithTOC",
    value: function renderBodyWithTOC(config, tableOfContents) {
      var children = this.props.children;
      var _this$state = this.state,
          isMenuOpen = _this$state.isMenuOpen,
          isTocOpen = _this$state.isTocOpen;
      return _react.default.createElement(_body.Body, null, _react.default.createElement(_header2.HeaderContainer, null, _react.default.createElement(ResponsiveHeader, {
        config: config,
        isMenuOpen: isMenuOpen,
        isTocOpen: isTocOpen,
        toggleToc: this.toggleToc.bind(this),
        toggleMenu: this.toggleMenu.bind(this),
        isDocHeader: true
      })), _react.default.createElement(_toc.TocContainer, {
        $isTocOpen: isTocOpen
      }, this.renderTOC(tableOfContents)), _react.default.createElement(_body.BodyContainerToC, null, _react.default.cloneElement(children, {
        config: config
      })));
    }
  }, {
    key: "renderBodyFull",
    value: function renderBodyFull(config) {
      var children = this.props.children;
      var isMenuOpen = this.state.isMenuOpen;
      return _react.default.createElement(_body.Body, null, _react.default.createElement(_header2.HeaderContainer, null, _react.default.createElement(ResponsiveHeader, {
        config: config,
        isMenuOpen: isMenuOpen,
        toggleMenu: this.toggleMenu.bind(this)
      })), _react.default.createElement(_body.BodyContainerFull, null, _react.default.cloneElement(children, {
        config: config
      })));
    }
  }, {
    key: "renderTOC",
    value: function renderTOC(tableOfContents) {
      var pageContext = this.props.pageContext;
      var toc;

      if (pageContext.toc === 'docs') {
        toc = tableOfContents.chapters;
      } else {
        toc = pageContext.toc;
      }

      if (!Array.isArray(toc)) {
        throw new Error("Unknown toc type ".concat(pageContext.toc));
      }

      return _react.default.createElement(_tableOfContents.default, {
        chapters: toc,
        slug: pageContext.slug
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          pageContext = _this$props.pageContext,
          config = _this$props.config,
          tableOfContents = _this$props.tableOfContents,
          path = _this$props.path;
      var theme = this.getTheme();
      var title = config.PROJECT_NAME;

      if (pageContext.title) {
        title += " | ".concat(pageContext.title);
      }

      return _react.default.createElement(_websiteConfig.WebsiteConfigProvider, {
        value: {
          config: config,
          theme: theme,
          tableOfContents: tableOfContents
        }
      }, _react.default.createElement(GlobalStyle, null), _react.default.createElement(_styledComponents.ThemeProvider, {
        theme: theme
      }, _react.default.createElement("div", null, _react.default.createElement(_SEO.default, {
        path: path,
        pageContext: pageContext,
        config: config
      }), _react.default.createElement(_reactHelmet.default, null, _react.default.createElement("title", null, title), config.STYLESHEETS.map(function (url, i) {
        return _react.default.createElement("link", {
          key: i,
          rel: "stylesheet",
          href: (0, _gatsby.withPrefix)(url),
          type: "text/css"
        });
      }), _react.default.createElement("link", {
        rel: "icon",
        type: "img/ico",
        href: "favicon.ico"
      })), pageContext.toc ? this.renderBodyWithTOC(config, tableOfContents) : this.renderBodyFull(config))));
    }
  }]);
  return Layout;
}(_react.default.Component);

exports.default = Layout;
//# sourceMappingURL=top-level-layout.js.map