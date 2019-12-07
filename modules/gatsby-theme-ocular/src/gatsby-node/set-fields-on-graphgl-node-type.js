// TODO - move to the src directory
const {addSiblingNodes} = require('./on-create-node/process-nodes-markdown');

module.exports = function setFieldsOnGraphQLNodeType({type, actions}) {
  const {name} = type;
  const {createNodeField} = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
}
