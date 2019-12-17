const {log, COLOR} = require('../../utils/log');
const getPageTemplateUrl = require('./get-page-template-url');
const {addToRelativeLinks} = require('../../utils/links-utils');

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them

function queryMarkdownDocs(graphql) {
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
                path
              }
            }
          }
        }
        site {
          siteMetadata {
            config {
              ROOT_FOLDER
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      /* eslint no-console: "off" */
      console.log(result.errors);
      throw new Error(result.errors);
    }
    return result;
  });
}

// Walks all markdown nodes and creates a doc page for each node
function createDocMarkdownPages({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  return queryMarkdownDocs(graphql).then(result => {
    const rootFolder = ocularOptions.ROOT_FOLDER;
    const pathToSlug = result.data.allMarkdownRemark.edges.map(({node}) => ({
      source: node.fileAbsolutePath,
      target: node.fields.slug
    }));

    result.data.allMarkdownRemark.edges.forEach(edge => {
      let relativeLinks = {};
      pathToSlug.forEach(({source, target}) => {
        relativeLinks = addToRelativeLinks({
          source,
          target,
          rootFolder,
          edge,
          relativeLinks
        });
      });

      // console.log('Creating doc page at', edge.node.fields.path);

      const componentUrl = getPageTemplateUrl('DOC_PAGE_URL', ocularOptions);

      createPage({
        path: edge.node.fields.path,
        component: componentUrl,
        context: {
          relativeLinks,
          slug: edge.node.fields.path,
          toc: 'docs'
        }
      });
    });
  });
}

module.exports = function createDocPages({graphql, actions}, ocularOptions) {
  log.log(
    {color: COLOR.CYAN, priority: 1},
    `Creating docs pages...`
  )();

  createDocMarkdownPages({graphql, actions}, ocularOptions);
};
