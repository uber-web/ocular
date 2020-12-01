"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var PAGE_TEMPLATES = require('./page-templates');

function queryMarkdown(graphql, path) {
  return graphql("{\n      mdx(fileAbsolutePath: {\n        eq: \"".concat(path, "\"\n      }) {\n        body\n      }\n    }")).then(function (result) {
    if (result.errors) {
      console.log(result.errors);
      return '';
    }

    return result.data.mdx;
  });
}

module.exports = function createIndexPage(_ref, ocularOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions;
  var createPage = actions.createPage;
  var pages = ocularOptions.PAGES ? ocularOptions.PAGES.slice() : [];
  var indexPage = pages.find(function (p) {
    return p.path === '/';
  });

  if (indexPage) {
    indexPage.componentUrl = indexPage.componentUrl || PAGE_TEMPLATES['INDEX_PAGE_URL'];
  } else {
    indexPage = {
      path: '/',
      componentUrl: ocularOptions.INDEX_PAGE_URL || PAGE_TEMPLATES['INDEX_PAGE_URL'],
      content: ocularOptions.HOME_MARKDOWN
    };
    pages.push(indexPage);
  }

  log.log({
    color: COLOR.CYAN,
    priority: 1
  }, "Creating index page from url ".concat(indexPage.componentUrl, "}"))();

  var _iterator = _createForOfIteratorHelper(pages),
      _step;

  try {
    var _loop = function _loop() {
      var page = _step.value;
      var loadContent = page.content ? queryMarkdown(graphql, page.content) : Promise.resolve(null);
      loadContent.then(function (result) {
        createPage({
          component: page.componentUrl || PAGE_TEMPLATES['MARKDOWN_PAGE_URL'],
          path: page.path,
          context: {
            title: page.title,
            content: result
          }
        });
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
//# sourceMappingURL=create-index-page.js.map