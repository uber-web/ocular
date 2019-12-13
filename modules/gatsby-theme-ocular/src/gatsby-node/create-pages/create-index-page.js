const {log, COLOR} = require('../../utils/log');

const getPageTemplateUrl = require('./get-page-template-url');

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them

module.exports = function createIndexPage({actions}, ocularOptions) {
  const {createPage} = actions;

  const componentUrl = getPageTemplateUrl('INDEX_PAGE_URL', ocularOptions);

  log.log(
    {color: COLOR.CYAN, priority: 1},
    `Creating index page from url ${componentUrl}}`
  )();

  createPage({
    component: componentUrl,
    path: '/'
  });
};
