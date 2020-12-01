"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.WebsiteConfigProvider = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var defaultContextValue = {
  initialized: false,
  config: {},
  tableOfContents: null,
  theme: {},
  data: {},
  set: function set() {}
};

var _React$createContext = _react.default.createContext(defaultContextValue),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var WebsiteConfigProvider = function (_React$Component) {
  (0, _inherits2.default)(WebsiteConfigProvider, _React$Component);

  var _super = _createSuper(WebsiteConfigProvider);

  function WebsiteConfigProvider(props) {
    var _this;

    (0, _classCallCheck2.default)(this, WebsiteConfigProvider);
    _this = _super.call(this, props);
    _this.setData = _this.setData.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = _objectSpread(_objectSpread(_objectSpread({}, defaultContextValue), props.value), {}, {
      set: _this.setData
    });
    return _this;
  }

  (0, _createClass2.default)(WebsiteConfigProvider, [{
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
      return _react.default.createElement(Provider, {
        value: this.state
      }, children);
    }
  }]);
  return WebsiteConfigProvider;
}(_react.default.Component);

exports.WebsiteConfigProvider = WebsiteConfigProvider;
var _default = Consumer;
exports.default = _default;
//# sourceMappingURL=website-config.js.map