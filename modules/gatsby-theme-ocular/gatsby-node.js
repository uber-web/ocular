// Import gatsby hook implementations and register them by exporting them with the right names
const sourceNodes = require('./src/gatsby-node/source-nodes');
const onCreateNode = require('./src/gatsby-node/on-create-node/on-create-node');
const onCreateWebpackConfig = require('./src/gatsby-node/on-create-webpack-config/on-create-webpack-config');
const createPages = require('./src/gatsby-node/create-pages/create-pages');

// TODO - move to the src directory
const {addSiblingNodes} = require('./src/gatsby-node/on-create-node/process-nodes-markdown');

function onPreBootstrap({ reporter }, ocularOptions) {
  // TODO - save these for onCreateWebpackConfig which does not seem to get them
  global.ocularOptions = ocularOptions;
}

function setFieldsOnGraphQLNodeType({type, actions}) {
  const {name} = type;
  const {createNodeField} = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
}

module.exports = {
  onPreBootstrap,
  sourceNodes,
  setFieldsOnGraphQLNodeType,
  onCreateNode,
  onCreateWebpackConfig,
  createPages
};
