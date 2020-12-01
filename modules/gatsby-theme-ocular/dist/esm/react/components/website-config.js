import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
var defaultContextValue = {
  initialized: false,
  config: {},
  tableOfContents: null,
  theme: {},
  data: {},
  set: function set() {}
};

var _React$createContext = React.createContext(defaultContextValue),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

export var WebsiteConfigProvider = function (_React$Component) {
  _inherits(WebsiteConfigProvider, _React$Component);

  var _super = _createSuper(WebsiteConfigProvider);

  function WebsiteConfigProvider(props) {
    var _this;

    _classCallCheck(this, WebsiteConfigProvider);

    _this = _super.call(this, props);
    _this.setData = _this.setData.bind(_assertThisInitialized(_this));
    _this.state = _objectSpread(_objectSpread(_objectSpread({}, defaultContextValue), props.value), {}, {
      set: _this.setData
    });
    return _this;
  }

  _createClass(WebsiteConfigProvider, [{
    key: "setData",
    value: function setData(newData) {
      this.setState(function (state) {
        return {
          data: _objectSpread(_objectSpread({}, state.data), newData)
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.createElement(Provider, {
        value: this.state
      }, children);
    }
  }]);

  return WebsiteConfigProvider;
}(React.Component);
export default Consumer;
//# sourceMappingURL=website-config.js.map