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

var _gatsby = require("gatsby");

var _example = require("../styled/example");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Examples = function (_Component) {
  (0, _inherits2.default)(Examples, _Component);

  var _super = _createSuper(Examples);

  function Examples() {
    (0, _classCallCheck2.default)(this, Examples);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Examples, [{
    key: "renderExample",
    value: function renderExample(_ref) {
      var title = _ref.title,
          path = _ref.path,
          image = _ref.image;
      return _react.default.createElement(_example.ExampleCard, {
        key: title,
        to: "/".concat(path)
      }, image ? _react.default.createElement("img", {
        width: "100%",
        src: (0, _gatsby.withPrefix)(image),
        alt: title
      }) : null, _react.default.createElement(_example.ExampleTitle, null, _react.default.createElement("span", null, title)));
    }
  }, {
    key: "renderCategory",
    value: function renderCategory(item) {
      var _this = this;

      if (item.entries) {
        return [_react.default.createElement(_example.ExampleHeader, {
          key: "".concat(item.title, "-header")
        }, item.title), _react.default.createElement(_example.ExamplesGroup, {
          key: item.title
        }, item.entries.map(function (entry) {
          return _this.renderExample(entry);
        }))];
      }

      return this.renderExample(item);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var toc = this.props.pageContext.toc;

      if (toc.length === 1) {
        return _react.default.createElement(_example.MainExamples, null, _react.default.createElement(_example.ExamplesGroup, null, toc[0].entries.map(function (entry) {
          return _this2.renderExample(entry);
        })));
      }

      return _react.default.createElement(_example.MainExamples, null, toc.map(function (exampleData) {
        return _this2.renderCategory(exampleData);
      }));
    }
  }]);
  return Examples;
}(_react.Component);

exports.default = Examples;
//# sourceMappingURL=examples.js.map