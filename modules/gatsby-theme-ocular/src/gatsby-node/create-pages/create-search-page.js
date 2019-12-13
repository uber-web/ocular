const {log, COLOR} = require('../../utils/log');
const getPageTemplateUrl = require('./get-page-template-url');

module.exports = function createSearchPage({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            excerpt
            frontmatter {
              title
            }
            rawMarkdownBody
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(results => {
    const componentUrl = getPageTemplateUrl('SEARCH_PAGE_URL', ocularOptions);

    log.log(
      {color: COLOR.CYAN, priority: 1},
      `Creating search page from url ${componentUrl}}`
    )();


    createPage({
      path: '/search',
      component: componentUrl,
      context: {
        data: results.data.allMarkdownRemark.edges.map(e => ({
          excerpt: e.node.excerpt,
          rawMarkdownBody: e.node.rawMarkdownBody,
          slug: e.node.fields.slug,
          title: e.node.frontmatter.title
        }))
      }
    });
  });
};
