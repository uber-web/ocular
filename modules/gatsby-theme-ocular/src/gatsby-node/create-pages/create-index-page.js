const {log, COLOR} = require('../../utils/log');

const getPageTemplateUrl = require('./get-page-template-url');

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them
function queryMarkdown(graphql, path) {
  return graphql(
    `{
      mdx(fileAbsolutePath: {
        eq: "${path}"
      }) {
        mdxAST
      }
    }`
  ).then(result => {
    if (result.errors) {
      /* eslint no-console: "off" */
      console.log(result.errors);
      return '';
    }
    return result.data.markdownRemark;
  });
}

module.exports = function createIndexPage({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  const componentUrl = getPageTemplateUrl('INDEX_PAGE_URL', ocularOptions);

  log.log(
    {color: COLOR.CYAN, priority: 1},
    `Creating index page from url ${componentUrl}}`
  )();

  queryMarkdown(graphql, ocularOptions.HOME_MARKDOWN).then(result => {
    createPage({
      component: componentUrl,
      path: '/',
      context: {
        projectDesc: result
      }
    });
  });

};
