import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import styled from 'styled-components';
var cachedResponse = null;
var ContribContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n"])));
var ContribLink = styled.a(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin: 10px;\n  display: inline-block;\n  width: 6rem;\n  height: 8rem;\n  text-decoration: none;\n  text-align: center;\n  color: ", ";\n\n  &:hover img {\n    border: 4px solid #fff;\n    box-shadow: 0 0 20px hsla(0, 0%, 0%, 0.3);\n    opacity: 1;\n  }\n"])), function (props) {
  return props.theme.colors.mono900;
});
var ContribImage = styled.img(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-radius: 50%;\n  border: 4px solid transparent;\n  box-shadow: 0 0 0 hsla(0, 0%, 0%, 0.3);\n  transition: border 0.5s, box-shadow 0.5s;\n  opacity: 0.9;\n"])));

var GithubContributors = function (_Component) {
  _inherits(GithubContributors, _Component);

  var _super = _createSuper(GithubContributors);

  function GithubContributors(props) {
    var _this;

    _classCallCheck(this, GithubContributors);

    _this = _super.call(this, props);
    _this.state = {
      response: cachedResponse
    };
    return _this;
  }

  _createClass(GithubContributors, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (cachedResponse) {
        return;
      }

      var project = this.props.project;
      fetch("https://api.github.com/repos/".concat(project, "/contributors")).then(function (response) {
        return response.json();
      }).then(function (response) {
        cachedResponse = response;

        _this2.setState({
          response: response
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var response = this.state.response;
      var contributors = Array.isArray(response) ? response : [];
      return React.createElement("div", null, React.createElement("h2", {
        style: {
          textAlign: 'center'
        }
      }, "Contributors"), React.createElement(ContribContainer, null, contributors.map(function (contributor) {
        return contributor && React.createElement(ContribLink, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: contributor.html_url,
          key: contributor.id
        }, React.createElement(ContribImage, {
          src: contributor.avatar_url,
          width: "100%",
          alt: contributor.login
        }), React.createElement("div", null, contributor.login));
      })));
    }
  }]);

  return GithubContributors;
}(Component);

export { GithubContributors as default };
//# sourceMappingURL=github-contributors.js.map