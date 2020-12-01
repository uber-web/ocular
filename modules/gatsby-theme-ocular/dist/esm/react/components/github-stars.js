import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, Fragment } from 'react';
import StarIcon from 'react-icons/lib/go/star';
var cachedResponse = null;

var GithubStars = function (_Component) {
  _inherits(GithubStars, _Component);

  var _super = _createSuper(GithubStars);

  function GithubStars(props) {
    var _this;

    _classCallCheck(this, GithubStars);

    _this = _super.call(this, props);
    _this.state = {
      response: cachedResponse
    };
    return _this;
  }

  _createClass(GithubStars, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (cachedResponse) {
        return;
      }

      var project = this.props.project;
      fetch("https://api.github.com/repos/".concat(project)).then(function (response) {
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
      var count = response && response.stargazers_count || '...';
      return React.createElement(Fragment, null, count, React.createElement(StarIcon, {
        style: {
          marginLeft: '0.2rem',
          position: 'relative',
          top: -1
        }
      }));
    }
  }]);

  return GithubStars;
}(Component);

export { GithubStars as default };
//# sourceMappingURL=github-stars.js.map