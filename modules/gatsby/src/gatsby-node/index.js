const {log, COLOR} = require('../utils/log');

const onCreateWebpackConfig = require('./create-webpack-config');
const createPages = require('./create-pages');
const {
  processNewMarkdownNode,
  cleanupMarkdownNode,
  addSiblingNodes
} = require('./process-nodes-markdown');
const {processNewDocsJsonNode} = require('./process-nodes-json');

// TODO/ib - avoid globals
const docNodes = {};
let tocNode = null;

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

function sourceNodes({actions}) {
  const {createTypes} = actions;
  // see https://graphql-compose.github.io/en/ for instructions on how to create types
  // see https://www.gatsbyjs.org/blog/2019-03-04-new-schema-customization/ for information on schema customization


  // these type definitions support the table of contents. when gastby tries to infer the schema
  // from the table of contents as it is read, it requires it to have a very strict shape/
  // by defining the schema independently of the content of the file we can be more flexible. 

  const typeDefs = `
    
    type EntryFrontMatter implements Node {
      title: String
    }

    type EntryFields implements Node {
      slug: String
    }
    
    type EntrychildMarkdownRemark implements Node {
      frontMatter: EntryFrontMatter
      fields: EntryFields
    }

    type Entry implements Node {
      childMarkdownRemark: EntrychildMarkdownRemark
    }

    type lvl2Chapter implements Node {
      title: String
      level: Int
      entries: [Entry]
    }

    type lvl1Chapter implements Node {
      title: String
      level: Int
      chapters: [lvl2Chapter]
      entries: [Entry]
    }
    
    type docsJson implements Node {
      chapters: [lvl1Chapter]
      entries: [Entry]
    }

    type DocsJson implements Node {
      chapters: [lvl1Chapter]
      entries: [Entry]
    }
    `;
  log.log({color: COLOR.RED}, `Created new typedefs`, typeDefs)();
  createTypes(typeDefs);
}

const GATSBY_NODE_CALLBACKS = {
  onCreateWebpackConfig,
  onCreateNode,
  setFieldsOnGraphQLNodeType,
  createPages,
  sourceNodes
};

// gatsby-node default implementation, user can just export these from gatsby-node
module.exports = function getGatsbyNodeCallbacks(config) {
  global.ocularConfig = config;
  return GATSBY_NODE_CALLBACKS;
};

Object.assign(module.exports, GATSBY_NODE_CALLBACKS);
