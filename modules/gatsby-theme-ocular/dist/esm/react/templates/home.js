import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import WebsiteConfigConsumer from '../components/website-config';
import GithubContributors from '../components/github-contributors';
import Markdown from '../components/markdown';
import { Banner, Container, BannerContainer, HeroExampleContainer, Section, ProjectName, GetStartedLink, Footer, FooterText, FooterLogo } from '../styled/home';

function renderPage(_ref) {
  var config = _ref.config,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? 'dark' : _ref$theme,
      HeroExample = _ref.HeroExample,
      content = _ref.content,
      children = _ref.children;
  return React.createElement(React.Fragment, null, React.createElement(Banner, {
    colortheme: theme
  }, React.createElement(HeroExampleContainer, null, HeroExample && React.createElement(HeroExample, null)), React.createElement(BannerContainer, null, React.createElement(ProjectName, null, config.PROJECT_NAME), React.createElement("p", null, config.PROJECT_DESC), React.createElement(GetStartedLink, {
    to: config.LINK_TO_GET_STARTED,
    colortheme: theme
  }, "GET STARTED"))), content && React.createElement(Section, null, React.createElement(Container, null, React.createElement(Markdown, {
    body: content.body
  }))), children, config.PROJECT_TYPE === 'github' && React.createElement(Section, null, React.createElement(Container, null, React.createElement(GithubContributors, {
    project: "".concat(config.PROJECT_ORG, "/").concat(config.PROJECT_NAME)
  }))), React.createElement(Footer, null, React.createElement(Container, null, config.PROJECT_ORG_LOGO && React.createElement(React.Fragment, null, React.createElement(FooterText, null, "Made by"), React.createElement(FooterLogo, {
    src: "".concat(config.PROJECT_ORG_LOGO),
    alt: "logo"
  })))));
}

var IndexPage = function (_Component) {
  _inherits(IndexPage, _Component);

  var _super = _createSuper(IndexPage);

  function IndexPage() {
    _classCallCheck(this, IndexPage);

    return _super.apply(this, arguments);
  }

  _createClass(IndexPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          HeroExample = _this$props.HeroExample,
          theme = _this$props.theme,
          pageContext = _this$props.pageContext,
          children = _this$props.children;
      return React.createElement("main", null, React.createElement(WebsiteConfigConsumer, null, function (_ref2) {
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
}(Component);

export { IndexPage as default };
//# sourceMappingURL=home.js.map