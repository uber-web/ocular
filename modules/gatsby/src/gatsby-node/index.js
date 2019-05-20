const {
  onCreateWebpackConfig,
  logWebpackConfig,
  getWebpackConfigOverrides
} = require('./create-webpack-config');
const createPages = require('./create-pages');
const {
  processNewMarkdownNode,
  cleanupMarkdownNode,
  addSiblingNodes
} = require('./process-nodes/process-nodes-markdown');
const {processNewMDXNode} = require('./process-nodes/process-nodes-mdx');
const {processNewDocsJsonNode} = require('./process-nodes/process-nodes-json');
const {sourceNodes} = require('./source-nodes');

// TODO/ib - avoid globals
const docNodes = {};
let tocNode = null;

function setOcularConfig(config) {
  global.ocularConfig = config;
}

function onCreateNode({node, actions, getNode}) {
  // log.log({color: COLOR.CYAN}, `Processed node`)();

  // Add missing fields to markdown nodes
  cleanupMarkdownNode({node, actions, getNode});

  switch (node.internal.type) {
    case 'MarkdownRemark':
      // Note: MarkdownRemark nodes are created by the gatsby-transformer-remark
      // markdown parser. These are different from the original file nodes
      // for the markdown files created by the gatsby-source-filesystem plugin.
      processNewMarkdownNode({node, actions, getNode}, docNodes, tocNode);
      break;

    case 'Mdx':
      processNewMDXNode({node, actions, getNode}, docNodes, tocNode);
      break;

    case 'DocsJson':
      tocNode = processNewDocsJsonNode({node, actions, getNode}, docNodes);
      break;

    default:
      console.log(node.internal.type, node.fileAbsolutePath);
  }
}

function setFieldsOnGraphQLNodeType({type, actions}) {
  const {name} = type;
  const {createNodeField} = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
}

const GATSBY_NODE_CALLBACKS = {
  onCreateWebpackConfig,
  onCreateNode,
  setFieldsOnGraphQLNodeType,
  createPages,
  sourceNodes,
};

// gatsby-node default implementation, user can just export these from gatsby-node
module.exports = function getGatsbyNodeCallbacks(config) {
  if (config) {
    setOcularConfig(config);
  }
  return GATSBY_NODE_CALLBACKS;
};

Object.assign(module.exports, GATSBY_NODE_CALLBACKS, {
  // Helpers
  setOcularConfig,
  logWebpackConfig,
  getWebpackConfigOverrides
});
