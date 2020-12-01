"use strict";

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var PAGE_TEMPLATES = require('./page-templates');

var _require2 = require('../../utils/links-utils'),
    addToRelativeLinks = _require2.addToRelativeLinks;

function queryMarkdownDocs(graphql) {
  return graphql("\n      {\n        allMdx {\n          edges {\n            node {\n              fileAbsolutePath\n              excerpt\n              frontmatter {\n                title\n              }\n              fields {\n                slug\n                path\n              }\n            }\n          }\n        }\n        site {\n          siteMetadata {\n            config {\n              ROOT_FOLDER\n            }\n          }\n        }\n      }\n    ").then(function (result) {
    if (result.errors) {
      console.log(result.errors);
      throw new Error(result.errors);
    }

    return result;
  });
}

function createDocMarkdownPages(_ref, ocularOptions) {
  var graphql = _ref.graphql,
      actions = _ref.actions;
  var createPage = actions.createPage;
  return queryMarkdownDocs(graphql).then(function (result) {
    var rootFolder = ocularOptions.ROOT_FOLDER;
    var pathToSlug = result.data.allMdx.edges.map(function (_ref2) {
      var node = _ref2.node;
      return {
        source: node.fileAbsolutePath,
        target: node.fields.slug
      };
    });
    result.data.allMdx.edges.forEach(function (edge) {
      var relativeLinks = {};
      pathToSlug.forEach(function (_ref3) {
        var source = _ref3.source,
            target = _ref3.target;
        relativeLinks = addToRelativeLinks({
          source: source,
          target: target,
          rootFolder: rootFolder,
          edge: edge,
          relativeLinks: relativeLinks,
          ocularOptions: ocularOptions
        });
      });
      var componentUrl = PAGE_TEMPLATES['DOC_MARKDOWN_PAGE_URL'];
      createPage({
        path: edge.node.fields.path,
        component: componentUrl,
        context: {
          relativeLinks: relativeLinks,
          title: edge.node.frontmatter.title,
          description: edge.node.fields.excerpt,
          slug: edge.node.fields.path,
          toc: 'docs'
        }
      });
    });
  });
}

module.exports = function createDocPages(_ref4, ocularOptions) {
  var graphql = _ref4.graphql,
      actions = _ref4.actions;
  log.log({
    color: COLOR.CYAN,
    priority: 1
  }, "Creating docs pages...")();
  return createDocMarkdownPages({
    graphql: graphql,
    actions: actions
  }, ocularOptions);
};
//# sourceMappingURL=create-doc-pages.js.map