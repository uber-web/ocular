import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import ControlledHeader, { generateHeaderLinks, propTypes } from './header.component';

var Header = function (_Component) {
  _inherits(Header, _Component);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, props);
    _this.state = {
      collapsed: true,
      links: generateHeaderLinks(props)
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Header, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          links = _this$state.links,
          collapsed = _this$state.collapsed;
      return React.createElement(ControlledHeader, _extends({}, this.props, {
        links: links,
        isLinksMenuOpen: false,
        isProjectsMenuOpen: !collapsed,
        toggleProjectsMenu: this.handleClick,
        toggleLinksMenu: function toggleLinksMenu() {}
      }));
    }
  }]);

  return Header;
}(Component);

export { Header as default };
Header.propTypes = propTypes;
//# sourceMappingURL=header.js.map