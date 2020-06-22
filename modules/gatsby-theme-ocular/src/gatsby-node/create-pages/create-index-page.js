const {log, COLOR} = require('../../utils/log');

const PAGE_TEMPLATES = require('./page-templates');

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them
function queryMarkdown(graphql, path) {
  return graphql(
    `{
      mdx(fileAbsolutePath: {
        eq: "${path}"
      }) {
        body
      }
    }`
  ).then(result => {
    if (result.errors) {
      /* eslint no-console: "off" */
      console.log(result.errors);
      return '';
    }
    return result.data.mdx;
  });
}

module.exports = function createIndexPage({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  const pages = ocularOptions.PAGES.slice();
  const indexPage = pages.find(p => p.path === '/');
  if (indexPage) {
    indexPage.componentUrl = indexPage.componentUrl || PAGE_TEMPLATES['INDEX_PAGE_URL'];
  } else {
    indexPage = {
      path: '/',
      componentUrl: PAGE_TEMPLATES['INDEX_PAGE_URL']
    };
    pages.push(indexPage);
  }

  log.log(
    {color: COLOR.CYAN, priority: 1},
    `Creating index page from url ${indexPage.componentUrl}}`
  )();

  for (const page of pages) {
    const loadContent = page.content
      ? queryMarkdown(graphql, page.content)
      : Promise.resolve(null);

    loadContent.then(result => {
      createPage({
        component: page.componentUrl || PAGE_TEMPLATES['MARKDOWN_PAGE_URL'],
        path: page.path,
        context: {
          content: result
        }
      });
    });
  }
};
