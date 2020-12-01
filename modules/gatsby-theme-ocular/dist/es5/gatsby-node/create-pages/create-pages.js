"use strict";

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var createIndexPage = require('./create-index-page');

var createDocPages = require('./create-doc-pages');

var createExamplePages = require('./create-example-pages');

var createSearchPage = require('./create-search-page');

module.exports = function createPages(_ref, ocularOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions;
  log.log({
    color: COLOR.CYAN
  }, 'generating pages')();
  var _ocularOptions$docPag = ocularOptions.docPages,
      docPages = _ocularOptions$docPag === void 0 ? true : _ocularOptions$docPag,
      _ocularOptions$exampl = ocularOptions.examplePages,
      examplePages = _ocularOptions$exampl === void 0 ? true : _ocularOptions$exampl,
      _ocularOptions$search = ocularOptions.searchPage,
      searchPage = _ocularOptions$search === void 0 ? true : _ocularOptions$search;

  if (!ocularOptions.HOME_PATH) {
    createIndexPage({
      graphql: graphql,
      actions: actions
    }, ocularOptions);
  }

  var docPromise;

  if (docPages) {
    docPromise = createDocPages({
      graphql: graphql,
      actions: actions
    }, ocularOptions);
  }

  var examplesPromise;

  if (examplePages) {
    examplesPromise = createExamplePages({
      graphql: graphql,
      actions: actions
    }, ocularOptions);
  }

  var searchPromise;

  if (searchPage) {
    searchPromise = createSearchPage({
      graphql: graphql,
      actions: actions
    }, ocularOptions);
  }

  return Promise.all([docPromise, examplesPromise, searchPromise]);
};
//# sourceMappingURL=create-pages.js.map