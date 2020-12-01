"use strict";

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var PAGE_TEMPLATES = require('./page-templates');

module.exports = function createSearchPage(_ref, ocularOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions;
  var createPage = actions.createPage;
  return graphql("\n    {\n      allMdx {\n        edges {\n          node {\n            excerpt(pruneLength: 100000)\n            frontmatter {\n              title\n            }\n            headings {\n              value\n              depth\n            }\n            fields {\n              slug\n            }\n          }\n        }\n      }\n    }\n  ").then(function (results) {
    var componentUrl = PAGE_TEMPLATES['SEARCH_PAGE_URL'];
    log.log({
      color: COLOR.CYAN,
      priority: 1
    }, "Creating search page from url ".concat(componentUrl, "}"))();
    createPage({
      path: '/search',
      component: componentUrl,
      context: {
        data: results.data.allMdx.edges.map(function (e) {
          return {
            excerpt: e.node.excerpt,
            headings: e.node.headings,
            slug: e.node.fields.slug,
            title: e.node.frontmatter.title
          };
        })
      }
    });
  });
};
//# sourceMappingURL=create-search-page.js.map