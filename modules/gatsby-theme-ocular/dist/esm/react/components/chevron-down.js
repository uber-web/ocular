import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';

var ChevronDownIcon = function (_Component) {
  _inherits(ChevronDownIcon, _Component);

  var _super = _createSuper(ChevronDownIcon);

  function ChevronDownIcon() {
    _classCallCheck(this, ChevronDownIcon);

    return _super.apply(this, arguments);
  }

  _createClass(ChevronDownIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? 24 : _this$props$width,
          _this$props$height = _this$props.height,
          height = _this$props$height === void 0 ? 24 : _this$props$height;
      return React.createElement("svg", {
        viewBox: "0 0 24 24",
        className: className,
        width: width,
        height: height
      }, React.createElement("title", null, "Chevron Down"), React.createElement("path", {
        transform: "rotate(270, 12, 12)",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7071C13.6834 17.0976 14.3166 17.0976 14.7071 16.7071C15.0976 16.3166 15.0976 15.6834 14.7071 15.2929L11.4142 12L14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z"
      }));
    }
  }]);

  return ChevronDownIcon;
}(Component);

export { ChevronDownIcon as default };
//# sourceMappingURL=chevron-down.js.map