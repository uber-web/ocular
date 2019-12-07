// Import gatsby hook implementations and register them by exporting them with the right names
const onPreBootstrap = require('./src/gatsby-node/on-pre-bootstrap');
const sourceNodes = require('./src/gatsby-node/source-nodes');
const setFieldsOnGraphQLNodeType = require('./src/gatsby-node/set-fields-on-graphgl-node-type');
const onCreateNode = require('./src/gatsby-node/on-create-node/on-create-node');
const onCreateWebpackConfig = require('./src/gatsby-node/on-create-webpack-config/on-create-webpack-config');
const createPages = require('./src/gatsby-node/create-pages/create-pages');

module.exports = {
  onPreBootstrap,
  sourceNodes,
  setFieldsOnGraphQLNodeType,
  onCreateNode,
  onCreateWebpackConfig,
  createPages
};
