var _require = require('./process-nodes-json'),
    processNewDocsJsonNode = _require.processNewDocsJsonNode;

var _require2 = require('./process-nodes-markdown'),
    processNewMarkdownNode = _require2.processNewMarkdownNode,
    cleanupMarkdownNode = _require2.cleanupMarkdownNode;

var docNodes = {};
var tocNode = null;

function onCreateNode(_ref, ocularOptions) {
  var node = _ref.node,
      actions = _ref.actions,
      getNode = _ref.getNode;
  cleanupMarkdownNode({
    node: node,
    actions: actions,
    getNode: getNode
  }, ocularOptions);

  switch (node.internal.type) {
    case 'MarkdownRemark':
    case 'Mdx':
      processNewMarkdownNode({
        node: node,
        actions: actions,
        getNode: getNode
      }, ocularOptions, docNodes, tocNode);
      break;

    case 'DocsJson':
      tocNode = processNewDocsJsonNode({
        node: node,
        actions: actions,
        getNode: getNode
      }, ocularOptions, docNodes);
      break;

    default:
  }
}

module.exports = onCreateNode;
//# sourceMappingURL=on-create-node.js.map