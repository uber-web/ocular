const {onCreateWebpackConfig} = require('./src/gatsby-node/create-webpack-config');
const createPages = require('./src/gatsby-node/create-pages');
const {processNewDocsJsonNode} = require('./src/gatsby-node/process-nodes/process-nodes-json');
const {sourceNodes} = require('./src/gatsby-node/source-nodes');
const {
  processNewMarkdownNode,
  cleanupMarkdownNode,
  addSiblingNodes
} = require('./src/gatsby-node/process-nodes/process-nodes-markdown');

// TODO - avoid globals
const docNodes = {};
let tocNode = null;

function onCreateNode({node, actions, getNode}) {
  // Add missing fields to markdown nodes
  cleanupMarkdownNode({node, actions, getNode});

  switch (node.internal.type) {
    case 'MarkdownRemark':
      // Note: MarkdownRemark nodes are created by the gatsby-transformer-remark
      // markdown parser. These are different from the original file nodes
      // for the markdown files created by the gatsby-source-filesystem plugin.
      processNewMarkdownNode({node, actions, getNode}, docNodes, tocNode);
      break;

    case 'DocsJson':
      tocNode = processNewDocsJsonNode({node, actions, getNode}, docNodes);
      break;

    default:
  }
}

function setFieldsOnGraphQLNodeType({type, actions}) {
  const {name} = type;
  const {createNodeField} = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
}

module.exports = {
  onCreateWebpackConfig,
  onCreateNode,
  setFieldsOnGraphQLNodeType,
  createPages,
  sourceNodes
};
