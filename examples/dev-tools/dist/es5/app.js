"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderToDOM = renderToDOM;
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var App = function (_PureComponent) {
  (0, _inherits2.default)(App, _PureComponent);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    (0, _classCallCheck2.default)(this, App);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        style: {
          color: 'red'
        }
      }, _react.default.createElement("p", null, "This is a minimal React example"), _react.default.createElement("p", null, "Line..."), _react.default.createElement("p", null, "Line..."), _react.default.createElement("p", null, "Line..."), _react.default.createElement("p", null, "Line..."));
    }
  }]);
  return App;
}(_react.PureComponent);

exports.default = App;

function renderToDOM(container) {
  (0, _reactDom.render)(_react.default.createElement(App, null), container);
}
//# sourceMappingURL=app.js.map