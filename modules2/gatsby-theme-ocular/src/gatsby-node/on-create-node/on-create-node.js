const {processNewDocsJsonNode} = require('./process-nodes-json');
const {processNewMarkdownNode, cleanupMarkdownNode} = require('./process-nodes-markdown');

// TODO - avoid globals
const docNodes = {};
let tocNode = null;

function onCreateNode({node, actions, getNode}, ocularOptions) {

  // Add missing fields to markdown nodes
  cleanupMarkdownNode({node, actions, getNode}, ocularOptions);

  switch (node.internal.type) {
    case 'MarkdownRemark':
    case 'Mdx':
      // Note: MarkdownRemark nodes are created by the gatsby-transformer-remark
      // markdown parser. These are different from the original file nodes
      // for the markdown files created by the gatsby-source-filesystem plugin.
      processNewMarkdownNode({node, actions, getNode}, ocularOptions, docNodes, tocNode);
      break;

    case 'DocsJson':
      tocNode = processNewDocsJsonNode({node, actions, getNode}, ocularOptions, docNodes);
      break;

    default:
  }
}

module.exports = onCreateNode;
