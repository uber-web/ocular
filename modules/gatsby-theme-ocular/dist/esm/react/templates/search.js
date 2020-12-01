import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import debounce from 'lodash.debounce';
import SearchIcon from '../components/search';
import WebsiteConfigConsumer from '../components/website-config';
import { MainSearch, SearchContainer, IconContainer, SearchInput, SearchResultItem, SearchResultLink, SearchResultHighlight, SearchResultPager } from '../styled/search';
var RESULTS_PER_PAGE = 10;
var MAX_EXCERPT_LENGTH = 200;

function renderHighlightedText(lines, regex) {
  var lineNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (Array.isArray(lines)) {
    return lines.map(function (line, i) {
      var elements = renderHighlightedText(line, regex, i);
      elements.unshift(React.createElement("br", {
        key: i
      }));
      return elements;
    });
  }

  return lines.split(regex).map(function (part, i) {
    return i % 2 === 0 ? React.createElement("span", {
      key: "".concat(lineNumber, "-").concat(i)
    }, part) : React.createElement(SearchResultHighlight, {
      key: "".concat(lineNumber, "-").concat(i)
    }, part);
  });
}

var SearchPage = function (_React$Component) {
  _inherits(SearchPage, _React$Component);

  var _super = _createSuper(SearchPage);

  function SearchPage(props) {
    var _this;

    _classCallCheck(this, SearchPage);

    _this = _super.call(this, props);
    _this.state = {
      currentQuery: '',
      lastQuery: '',
      visibleResultsCount: RESULTS_PER_PAGE,
      results: []
    };
    _this.findResults = debounce(_this.findResults.bind(_assertThisInitialized(_this)), 250);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchPage, [{
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
          result.element = React.createElement(SearchResultItem, {
            key: result.node.slug
          }, React.createElement(SearchResultLink, {
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
      return React.createElement(MainSearch, null, React.createElement(SearchContainer, null, React.createElement(IconContainer, null, React.createElement(SearchIcon, {
        width: 24,
        height: 24
      })), React.createElement(SearchInput, {
        type: "text",
        placeholder: "Search",
        onChange: this.handleChange,
        value: currentQuery
      })), debouncing ? React.createElement("div", null, "Searching...") : null, React.createElement("div", null, currentQuery && !debouncing && React.createElement("div", null, results.length ? "".concat(results.length, " articles found.") : "No result for this query."), !currentQuery && !debouncing && React.createElement("div", null, pathContext.data ? "".concat(pathContext.data.length, " articles indexed.") : ''), React.createElement("div", null, this.renderResults()), visibleResultsCount < results.length && React.createElement(SearchResultPager, {
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

      return React.createElement(WebsiteConfigConsumer, null, function () {
        return _this3.renderPage();
      });
    }
  }]);

  return SearchPage;
}(React.Component);

export { SearchPage as default };
//# sourceMappingURL=search.js.map