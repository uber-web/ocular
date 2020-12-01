"use strict";

var sourceNodes = require('./source-nodes');

var onCreateNode = require('./on-create-node/on-create-node');

var onCreateWebpackConfig = require('./on-create-webpack-config/on-create-webpack-config');

var createPages = require('./create-pages/create-pages');

var _require = require('./on-create-node/process-nodes-markdown'),
    addSiblingNodes = _require.addSiblingNodes;

function onPreBootstrap(context, ocularOptions) {
  global.ocularOptions = ocularOptions;
}

function setFieldsOnGraphQLNodeType(_ref) {
  var type = _ref.type,
      actions = _ref.actions;
  var name = type.name;
  var createNodeField = actions.createNodeField;

  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
}

module.exports = {
  onPreBootstrap: onPreBootstrap,
  sourceNodes: sourceNodes,
  setFieldsOnGraphQLNodeType: setFieldsOnGraphQLNodeType,
  onCreateNode: onCreateNode,
  onCreateWebpackConfig: onCreateWebpackConfig,
  createPages: createPages
};
//# sourceMappingURL=index.js.map