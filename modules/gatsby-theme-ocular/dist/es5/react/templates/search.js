"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _search = _interopRequireDefault(require("../components/search"));

var _websiteConfig = _interopRequireDefault(require("../components/website-config"));

var _search2 = require("../styled/search");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RESULTS_PER_PAGE = 10;
var MAX_EXCERPT_LENGTH = 200;

function renderHighlightedText(lines, regex) {
  var lineNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (Array.isArray(lines)) {
    return lines.map(function (line, i) {
      var elements = renderHighlightedText(line, regex, i);
      elements.unshift(_react.default.createElement("br", {
        key: i
      }));
      return elements;
    });
  }

  return lines.split(regex).map(function (part, i) {
    return i % 2 === 0 ? _react.default.createElement("span", {
      key: "".concat(lineNumber, "-").concat(i)
    }, part) : _react.default.createElement(_search2.SearchResultHighlight, {
      key: "".concat(lineNumber, "-").concat(i)
    }, part);
  });
}

var SearchPage = function (_React$Component) {
  (0, _inherits2.default)(SearchPage, _React$Component);

  var _super = _createSuper(SearchPage);

  function SearchPage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SearchPage);
    _this = _super.call(this, props);
    _this.state = {
      currentQuery: '',
      lastQuery: '',
      visibleResultsCount: RESULTS_PER_PAGE,
      results: []
    };
    _this.findResults = (0, _lodash.default)(_this.findResults.bind((0, _assertThisInitialized2.default)(_this)), 250);
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(SearchPage, [{
    key: "findResults",
    value: function findResults(currentQuery) {
      var lastQuery = this.state.lastQuery;
      var pathContext = this.props.pathContext;
      this.setState({
        debouncing: false
      });
      currentQuery = currentQuery.replace(/[^\w-]/g, ' ').replace(/\s+/g, ' ').trim();

      if (currentQuery === lastQuery) {
        return;
      }

      var regex = null;
      var results = [];

      if (currentQuery) {
        regex = new RegExp("(".concat(currentQuery, ")"), 'i');

        for (var i = 0; i < pathContext.data.length; i++) {
          var node = pathContext.data[i];
          var matches = [];
          var priority = Infinity;

          if (node.title && regex.test(node.title)) {
            priority = 0;
          }

          if (node.headings) {
            var totalLength = 0;

            var _iterator = _createForOfIteratorHelper(node.headings),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var heading = _step.value;

                if (regex.test(heading.value)) {
                  priority = Math.min(priority, heading.depth);
                  totalLength += heading.value.length;
                  matches.push(heading.value);
                }

                if (totalLength >= MAX_EXCERPT_LENGTH) {
                  break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          if (!Number.isFinite(priority) && node.excerpt) {
            var index = node.excerpt.search(regex);

            if (index >= 0) {
              priority = 100;
              var excerpt = node.excerpt.slice(index - 30);
              excerpt = excerpt.slice(excerpt.indexOf(' ') + 1).slice(0, MAX_EXCERPT_LENGTH) + '...';
              matches.push(excerpt);
            }
          }

          if (Number.isFinite(priority)) {
            results.push({
              node: node,
              priority: priority,
              matches: matches
            });
          }
        }
      }

      results.sort(function (r1, r2) {
        return r1.priority - r2.priority;
      });
      this.setState({
        results: results,
        regex: regex,
        visibleResultsCount: RESULTS_PER_PAGE,
        lastQuery: currentQuery
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var currentQuery = event.target.value;
      this.setState({
        currentQuery: currentQuery,
        debouncing: true
      });
      this.findResults(currentQuery);
    }
  }, {
    key: "renderResults",
    value: function renderResults() {
      var _this$state = this.state,
          results = _this$state.results,
          regex = _this$state.regex,
          visibleResultsCount = _this$state.visibleResultsCount;
      return results.slice(0, visibleResultsCount).map(function (result) {
        if (!result.element) {
          result.element = _react.default.createElement(_search2.SearchResultItem, {
            key: result.node.slug
          }, _react.default.createElement(_search2.SearchResultLink, {
            to: "/".concat(result.node.slug)
          }, result.node.title), renderHighlightedText(result.matches, regex));
        }

        return result.element;
      });
    }
  }, {
    key: "renderPage",
    value: function renderPage() {
      var _this2 = this;

      var _this$state2 = this.state,
          debouncing = _this$state2.debouncing,
          results = _this$state2.results,
          visibleResultsCount = _this$state2.visibleResultsCount,
          currentQuery = _this$state2.currentQuery;
      var pathContext = this.props.pathContext;
      return _react.default.createElement(_search2.MainSearch, null, _react.default.createElement(_search2.SearchContainer, null, _react.default.createElement(_search2.IconContainer, null, _react.default.createElement(_search.default, {
        width: 24,
        height: 24
      })), _react.default.createElement(_search2.SearchInput, {
        type: "text",
        placeholder: "Search",
        onChange: this.handleChange,
        value: currentQuery
      })), debouncing ? _react.default.createElement("div", null, "Searching...") : null, _react.default.createElement("div", null, currentQuery && !debouncing && _react.default.createElement("div", null, results.length ? "".concat(results.length, " articles found.") : "No result for this query."), !currentQuery && !debouncing && _react.default.createElement("div", null, pathContext.data ? "".concat(pathContext.data.length, " articles indexed.") : ''), _react.default.createElement("div", null, this.renderResults()), visibleResultsCount < results.length && _react.default.createElement(_search2.SearchResultPager, {
        onClick: function onClick() {
          return _this2.setState({
            visibleResultsCount: visibleResultsCount + RESULTS_PER_PAGE
          });
        }
      }, "Load more...")));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement(_websiteConfig.default, null, function () {
        return _this3.renderPage();
      });
    }
  }]);
  return SearchPage;
}(_react.default.Component);

exports.default = SearchPage;
//# sourceMappingURL=search.js.map