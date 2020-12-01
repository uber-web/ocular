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

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var cachedResponse = null;

var ContribContainer = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n"])));

var ContribLink = _styledComponents.default.a(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 10px;\n  display: inline-block;\n  width: 6rem;\n  height: 8rem;\n  text-decoration: none;\n  text-align: center;\n  color: ", ";\n\n  &:hover img {\n    border: 4px solid #fff;\n    box-shadow: 0 0 20px hsla(0, 0%, 0%, 0.3);\n    opacity: 1;\n  }\n"])), function (props) {
  return props.theme.colors.mono900;
});

var ContribImage = _styledComponents.default.img(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  border-radius: 50%;\n  border: 4px solid transparent;\n  box-shadow: 0 0 0 hsla(0, 0%, 0%, 0.3);\n  transition: border 0.5s, box-shadow 0.5s;\n  opacity: 0.9;\n"])));

var GithubContributors = function (_Component) {
  (0, _inherits2.default)(GithubContributors, _Component);

  var _super = _createSuper(GithubContributors);

  function GithubContributors(props) {
    var _this;

    (0, _classCallCheck2.default)(this, GithubContributors);
    _this = _super.call(this, props);
    _this.state = {
      response: cachedResponse
    };
    return _this;
  }

  (0, _createClass2.default)(GithubContributors, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (cachedResponse) {
        return;
      }

      var project = this.props.project;
      fetch("https://api.github.com/repos/".concat(project, "/contributors")).then(function (response) {
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
      var contributors = Array.isArray(response) ? response : [];
      return _react.default.createElement("div", null, _react.default.createElement("h2", {
        style: {
          textAlign: 'center'
        }
      }, "Contributors"), _react.default.createElement(ContribContainer, null, contributors.map(function (contributor) {
        return contributor && _react.default.createElement(ContribLink, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: contributor.html_url,
          key: contributor.id
        }, _react.default.createElement(ContribImage, {
          src: contributor.avatar_url,
          width: "100%",
          alt: contributor.login
        }), _react.default.createElement("div", null, contributor.login));
      })));
    }
  }]);
  return GithubContributors;
}(_react.Component);

exports.default = GithubContributors;
//# sourceMappingURL=github-contributors.js.map