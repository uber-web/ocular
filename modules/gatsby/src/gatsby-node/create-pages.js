const {log, COLOR} = require('../utils/log');

const createIndexPage = require('./pages/create-index-page');
const createDocPages = require('./pages/create-doc-pages');
const createExamplePages = require('./pages/create-example-pages');
const createSearchPage = require('./pages/create-search-page');

// This is a main gatsby entry point
// Here we get to programmatically create pages after all nodes are created
// by gatsby.
// We use graphgl to query for nodes and iterate
module.exports = function createPages({graphql, actions}, pluginOptions) {
  log.log({color: COLOR.CYAN}, 'generating pages')();
  // TODO/ib - plugin options no longer provided when we are not a plugin
  // We seem to be getting site metadata instead?
  const {
    docPages = true,
    examplePages = true,
    searchPage = true // TODO - autodetect based on DEMOS config
  } = pluginOptions;

  createIndexPage({graphql, actions});

  let docPromise;
  if (docPages) {
    docPromise = createDocPages({graphql, actions});
  }

  let examplesPromise;
  if (examplePages) {
    examplesPromise = createExamplePages({graphql, actions});
  }

  let searchPromise;
  if (searchPage) {
    searchPromise = createSearchPage({graphql, actions});
  }

  return Promise.all([docPromise, examplesPromise, searchPromise]);
};
