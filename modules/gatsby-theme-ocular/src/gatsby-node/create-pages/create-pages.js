const {log, COLOR} = require('../../utils/log');

const createIndexPage = require('./create-index-page');
const createDocPages = require('./create-doc-pages');
const createExamplePages = require('./create-example-pages');
const createSearchPage = require('./create-search-page');

// This is a main gatsby entry point
// Here we get to programmatically create pages after all nodes are created
// by gatsby.
// We use graphgl to query for nodes and iterate
module.exports = function createPages({graphql, actions}, ocularOptions) {
  log.log({color: COLOR.CYAN}, 'generating pages')();
  // TODO/ib - plugin options no longer provided when we are not a plugin
  // We seem to be getting site metadata instead?
  const {
    docPages = true,
    examplePages = true,
    searchPage = true // TODO - autodetect based on DEMOS config
  } = ocularOptions;

  createIndexPage({graphql, actions}, ocularOptions);

  let docPromise;
  if (docPages) {
    docPromise = createDocPages({graphql, actions}, ocularOptions);
  }

  let examplesPromise;
  if (examplePages) {
    examplesPromise = createExamplePages({graphql, actions}, ocularOptions);
  }

  let searchPromise;
  if (searchPage) {
    searchPromise = createSearchPage({graphql, actions}, ocularOptions);
  }

  return Promise.all([docPromise, examplesPromise, searchPromise]);
};
