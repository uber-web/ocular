const getPageTemplateUrl = require('./get-page-template-url');

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them

module.exports = function createIndexPage({actions}) {
  const {createPage} = actions;

  const componentUrl = getPageTemplateUrl('INDEX_PAGE_URL');

  createPage({
    component: componentUrl,
    path: '/'
  });
};
