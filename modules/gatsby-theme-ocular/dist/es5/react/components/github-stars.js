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

var _star = _interopRequireDefault(require("react-icons/lib/go/star"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var cachedResponse = null;

var GithubStars = function (_Component) {
  (0, _inherits2.default)(GithubStars, _Component);

  var _super = _createSuper(GithubStars);

  function GithubStars(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GithubStars);
    _this = _super.call(this, props);
    _this.state = {
      response: cachedResponse
    };
    return _this;
  }

  (0, _createClass2.default)(GithubStars, [{
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
      return _react.default.createElement(_react.Fragment, null, count, _react.default.createElement(_star.default, {
        style: {
          marginLeft: '0.2rem',
          position: 'relative',
          top: -1
        }
      }));
    }
  }]);
  return GithubStars;
}(_react.Component);

exports.default = GithubStars;
//# sourceMappingURL=github-stars.js.map