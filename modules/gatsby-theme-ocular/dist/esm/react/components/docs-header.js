import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import ControlledHeader, { generateHeaderLinks, propTypes } from './header.component';

var DocsHeader = function (_Component) {
  _inherits(DocsHeader, _Component);

  var _super = _createSuper(DocsHeader);

  function DocsHeader(props) {
    var _this;

    _classCallCheck(this, DocsHeader);

    _this = _super.call(this, props);
    _this.state = {
      links: generateHeaderLinks(props)
    };
    return _this;
  }

  _createClass(DocsHeader, [{
    key: "renderHeader",
    value: function renderHeader() {
      var links = this.state.links;
      return React.createElement(ControlledHeader, _extends({
        links: links
      }, this.props));
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderHeader();
    }
  }]);

  return DocsHeader;
}(Component);

export { DocsHeader as default };
DocsHeader.propTypes = propTypes;
//# sourceMappingURL=docs-header.js.map