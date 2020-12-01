import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { withPrefix } from 'gatsby';
import { WebsiteConfigProvider } from '../components/website-config';
import SEO from '../components/SEO';
import TableOfContents from '../components/table-of-contents';
import Header from '../components/header';
import DocsHeader from '../components/docs-header';
import defaultTheme from '../default-theme';
import createTheme from '../styled/create-theme';
import { BodyContainerFull, BodyContainerToC, Body } from '../styled/body';
import { HeaderContainer } from '../styled/header';
import { TocContainer } from '../styled/toc';
var GlobalStyle = createGlobalStyle(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  body {\n    margin: 0;\n    overflow-x: hidden;\n    -webkit-text-size-adjust: 100%;\n  }\n  * {\n    box-sizing: border-box;\n  }\n"])));

function ResponsiveHeader(props) {
  var HeaderComponent = props.isDocHeader ? DocsHeader : Header;
  return React.createElement("div", null, React.createElement(MediaQuery, {
    maxWidth: 768
  }, React.createElement(HeaderComponent, _extends({}, props, {
    isSmallScreen: true
  }))), React.createElement(MediaQuery, {
    minWidth: 769
  }, React.createElement(HeaderComponent, props)));
}

var Layout = function (_React$Component) {
  _inherits(Layout, _React$Component);

  var _super = _createSuper(Layout);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, props);
    _this.state = {
      isMenuOpen: false,
      isTocOpen: false
    };
    return _this;
  }

  _createClass(Layout, [{
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
      var primitives = Object.assign({}, defaultTheme);

      if (config.THEME_OVERRIDES) {
        Object.assign(primitives, JSON.parse(config.THEME_OVERRIDES));
      }

      return createTheme(primitives);
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
      return React.createElement(Body, null, React.createElement(HeaderContainer, null, React.createElement(ResponsiveHeader, {
        config: config,
        isMenuOpen: isMenuOpen,
        isTocOpen: isTocOpen,
        toggleToc: this.toggleToc.bind(this),
        toggleMenu: this.toggleMenu.bind(this),
        isDocHeader: true
      })), React.createElement(TocContainer, {
        $isTocOpen: isTocOpen
      }, this.renderTOC(tableOfContents)), React.createElement(BodyContainerToC, null, React.cloneElement(children, {
        config: config
      })));
    }
  }, {
    key: "renderBodyFull",
    value: function renderBodyFull(config) {
      var children = this.props.children;
      var isMenuOpen = this.state.isMenuOpen;
      return React.createElement(Body, null, React.createElement(HeaderContainer, null, React.createElement(ResponsiveHeader, {
        config: config,
        isMenuOpen: isMenuOpen,
        toggleMenu: this.toggleMenu.bind(this)
      })), React.createElement(BodyContainerFull, null, React.cloneElement(children, {
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

      return React.createElement(TableOfContents, {
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

      return React.createElement(WebsiteConfigProvider, {
        value: {
          config: config,
          theme: theme,
          tableOfContents: tableOfContents
        }
      }, React.createElement(GlobalStyle, null), React.createElement(ThemeProvider, {
        theme: theme
      }, React.createElement("div", null, React.createElement(SEO, {
        path: path,
        pageContext: pageContext,
        config: config
      }), React.createElement(Helmet, null, React.createElement("title", null, title), config.STYLESHEETS.map(function (url, i) {
        return React.createElement("link", {
          key: i,
          rel: "stylesheet",
          href: withPrefix(url),
          type: "text/css"
        });
      }), React.createElement("link", {
        rel: "icon",
        type: "img/ico",
        href: "favicon.ico"
      })), pageContext.toc ? this.renderBodyWithTOC(config, tableOfContents) : this.renderBodyFull(config))));
    }
  }]);

  return Layout;
}(React.Component);

export { Layout as default };
//# sourceMappingURL=top-level-layout.js.map