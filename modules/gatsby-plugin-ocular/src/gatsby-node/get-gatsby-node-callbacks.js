const {log, COLOR} = require('../utils/log');

const createPages = require('./create-pages');
const {processNewMarkdownNode, cleanupMarkdownNode, addSiblingNodes} = require('./process-nodes-markdown');
const {processNewDocsJsonNode} = require('./process-nodes-json');

// TODO/ib - avoid globals
const docNodes = {};

// See
// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/add-custom-webpack-config.md#modifying-the-babel-loader
// https://github.com/gatsbyjs/gatsby/issues/3052
function onCreateWebpackConfig(opts, ocularPluginOptions) {
  const {
    stage,     // build stage: ‘develop’, ‘develop-html’, ‘build-javascript’, or ‘build-html’
    getConfig, // Function that returns the current webpack config
    rules,     // Object (map): set of preconfigured webpack config rules
    loaders,   // Object (map): set of preconfigured webpack config loaders
    plugins,    // Object (map): A set of preconfigured webpack config plugins
    actions
  } = opts;

  let config = getConfig();

  // Recreate it with custom exclude filter
  const newJSRule = {
    // Called without any arguments, `loaders.js` will return an
    // object like:
    // {
    //   options: undefined,
    //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
    // }
    // Unless you're replacing Babel with a different transpiler, you probably
    // want this so that Gatsby will apply its required Babel
    // presets/plugins.  This will also merge in your configuration from
    // `babel.config.js`.
    ...loaders.js(),

    // JS and JSX
    test: /\.jsx?$/,

    // Exclude all node_modules from transpilation, except for ocular
    exclude: modulePath =>
      /node_modules/.test(modulePath) &&
      !/node_modules\/(ocular|gatsby-plugin-ocular)/.test(modulePath),
  };

  const newConfig = {};
  newConfig.module = newConfig.module = {};
  newConfig.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    newJSRule
  ];

  // nulling out `fs` avoids issues with certain node modules getting bundled,
  // e.g. headless-gl gets bundled by luma.gl if installed in root folder
  newConfig.node = newConfig.node || {};
  newConfig.node.fs = 'empty';

  Object.assign(newConfig, ocularPluginOptions.webpack);

  // Completely replace the webpack config for the current stage.
  // This can be dangerous and break Gatsby if certain configuration options are changed.
  // Generally only useful for cases where you need to handle config merging logic yourself,
  // in which case consider using webpack-merge.
  actions.setWebpackConfig(newConfig);

  /* UNCOMMENT TO DEBUG THE CONFUG
  config = getConfig();
  const jsRules = config.module.rules.filter(rule => String(rule.test) === String(/\.jsx?$/))
  const oldJSRule = jsRules[0];

  log.log({color: COLOR.CYAN},
    `Webpack config ${JSON.stringify(jsRules[0])} => ${JSON.stringify(newJSRule)}
${oldJSRule.test} => ${newJSRule.test}
${oldJSRule.include} => ${newJSRule.include}
${oldJSRule.exclude} => ${newJSRule.exclude}`
  // config,
  )(); //, ocularPluginOptions.webpack\)();
  */
}

function onCreateNode({ node, actions, getNode }) {
  // log.log({color: COLOR.CYAN}, `Processed node`)();

  // Add missing fields to markdown nodes
  cleanupMarkdownNode({ node, actions, getNode });

  switch (node.internal.type) {
  case "MarkdownRemark":
    // Note: MarkdownRemark nodes are created by the gatsby-transformer-remark
    // markdown parser. These are different from the original file nodes
    // for the markdown files created by the gatsby-source-filesystem plugin.
    processNewMarkdownNode({ node, actions, getNode }, docNodes);
    break;

  case 'DocsJson':
    processNewDocsJsonNode({ node, actions, getNode }, docNodes);
    break;

  default:
  }
}

function setFieldsOnGraphQLNodeType({ type, actions }) {
  const { name } = type;
  const { createNodeField } = actions;
  if (name === "MarkdownRemark") {
    addSiblingNodes(createNodeField);
  }
};

// gatsby-node default implementation, user can just export these from gatsby-node
module.exports = function getGatsbyNodeCallbacks() {
  return {
    onCreateWebpackConfig,
    onCreateNode,
    setFieldsOnGraphQLNodeType,
    createPages
  };
}
