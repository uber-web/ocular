const getPageTemplateUrl = require('./get-page-template-url');

module.exports = function createSearchPage({ graphql, actions }) {
  const { createPage } = actions;

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
    const componentUrl = getPageTemplateUrl('SEARCH_PAGE_URL');

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
    })
  });
}

