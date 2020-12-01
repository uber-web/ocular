"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _example = require("../styled/example");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var InfoPanel = function (_PureComponent) {
  (0, _inherits2.default)(InfoPanel, _PureComponent);

  var _super = _createSuper(InfoPanel);

  function InfoPanel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, InfoPanel);
    _this = _super.call(this, props);
    _this.state = {
      isExpanded: false
    };
    return _this;
  }

  (0, _createClass2.default)(InfoPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          title = _this$props.title,
          children = _this$props.children,
          sourceLink = _this$props.sourceLink;
      var isExpanded = this.state.isExpanded;
      return _react.default.createElement(_example.PanelContainer, null, _react.default.createElement(_example.PanelTitle, {
        onClick: function onClick() {
          return _this2.setState({
            isExpanded: !isExpanded
          });
        }
      }, _react.default.createElement("div", null, title), _react.default.createElement(_example.PanelExpander, {
        $expanded: isExpanded
      }, isExpanded ? '✕' : 'i')), _react.default.createElement(_example.PanelContent, {
        $expanded: isExpanded
      }, children), _react.default.createElement(_example.SourceLink, {
        $expanded: isExpanded,
        href: sourceLink,
        target: "_new"
      }, "View Code \u2197"));
    }
  }]);
  return InfoPanel;
}(_react.PureComponent);

exports.default = InfoPanel;
//# sourceMappingURL=info-panel.js.map