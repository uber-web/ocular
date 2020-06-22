const {log, COLOR} = require('../../utils/log');
const PAGE_TEMPLATES = require('./page-templates');

module.exports = function createSearchPage({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  return graphql(`
    {
      allMdx {
        edges {
          node {
            excerpt
            frontmatter {
              title
            }
            rawBody
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(results => {
    const componentUrl = PAGE_TEMPLATES['SEARCH_PAGE_URL'];

    log.log(
      {color: COLOR.CYAN, priority: 1},
      `Creating search page from url ${componentUrl}}`
    )();


    createPage({
      path: '/search',
      component: componentUrl,
      context: {
        data: results.data.allMdx.edges.map(e => ({
          excerpt: e.node.excerpt,
          rawBody: e.node.rawBody,
          slug: e.node.fields.slug,
          title: e.node.frontmatter.title
        }))
      }
    });
  });
};
