const path = require('path');
const assert = require('assert');

const { log, COLOR } = require('../utils/log');

// PATHS TO REACT PAGES
const INDEX_PAGE = path.resolve(__dirname, '../templates/index.jsx');

const DOC_PAGE = path.resolve(__dirname, '../templates/doc-n.jsx');

const EXAMPLES_PAGE = path.resolve(__dirname, '../templates/examples.jsx');
const EXAMPLE_PAGE = path.resolve(__dirname, '../templates/example-n.jsx');

assert(INDEX_PAGE && DOC_PAGE && EXAMPLES_PAGE && EXAMPLE_PAGE);

// const POST_PAGE = path.resolve('../src/templates/post.jsx');
// const TAG_PAGE = path.resolve(__dirname, '../src/templates/tag.jsx');
// const CATEGORY_PAGE = path.resolve(__dirname, '../src/templates/category.jsx');

// This is a main gatsby entry point
// Here we get to programmatically create pages after all nodes are created
// by gatsby.
// We use graphgl to query for nodes and iterate
module.exports = function createPages({ graphql, actions }, pluginOptions) {
  log.log({ color: COLOR.CYAN }, 'generating pages')();

  // TODO/ib - plugin options no longer provided when we are not a plugin
  // We seem to be getting site metadata instead?
  const {
    docPages = true,
    examplePages = true // TODO - autodetect based on DEMOS config
  } = pluginOptions;

  createStaticPages({ graphql, actions });

  let docPromise;
  if (docPages) {
    docPromise = createDocPages({ graphql, actions });
  }

  let examplesPromise;
  if (examplePages) {
    examplesPromise = createExamplePages({ graphql, actions });
  }

  return Promise.all([docPromise, examplesPromise]);
};

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them

function createStaticPages({ graphql, actions }) {
  const { createPage } = actions;

  createPage({
    component: INDEX_PAGE,
    path: '/'
  });
}

function createExamplePages({ graphql, actions }) {
  const { createPage } = actions;

  return graphql(`
    {
      site {
        siteMetadata {
          config {
            EXAMPLES {
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    console.log(result);

    if (result.errors) {
      /* eslint no-console: "off" */
      console.log(result.errors);
      throw new Error(result.errors);
    }

    const { EXAMPLES } = result.data.site.siteMetadata.config;

    // If the no examples marker, return without creating pages
    if (EXAMPLES.length === 0 || EXAMPLES[0].title === 'none') {
      return;
    }

    createPage({
      component: EXAMPLES_PAGE,
      path: '/examples',
      context: {
        toc: 'examples'
      }
    });

    for (const example of EXAMPLES) {
      const exampleName = example.title;

      log.log(
        { color: COLOR.CYAN, priority: 1 },
        `Creating example page ${JSON.stringify(example)}`
      )();

      createPage({
        path: example.path,
        component: EXAMPLE_PAGE,
        context: {
          slug: exampleName,
          toc: 'examples'
        }
      });
    }
  });
}

function addToRelativeLinks({
  source,
  target,
  rootFolder,
  edge,
  relativeLinks
}) {
  // what we are doing here: for each markdown file, we create a mapping of different ways to
  // link to another markdown file that we will honor.

  // let's suppose that we want to go from a file:
  // - physical location: /docs/my-files/source.md, slug: /docs/chapter-1/source
  // to this file:
  // - phyiscal location: /docs/developer-guide/target.md, slug: /docs/advanced-usage/api-reference/target

  // by default, '../../advanced-usage/api/reference/target' would work (target file slug, relative to original slug)
  // '/docs/advanced-usage/api-reference/target' would also work (absolute target slug)
  // however, on github, those links wouldn't work as there is no phyiscal file behind that link.
  // in github however: '/docs/developer-guide/target.md' (file name relative to root) or
  // '../developer-guide/target.md' (relative file name) would work. Those links wouldn't work on the gatsby rendered
  // page however (until that).

  // we are creating a mapping so that ANY OF THESE 4 SYNTAXES would be honored.
  // So, authors can use links that refer to physical files, and gatsby will render a link that works - the same link
  // can work on github and gatsby

  // note that often, the physical location and the slug are the same!
  // However there is no guarantee that this will be the case.

  const relativeToCurrentFile = path.relative(
    edge.node.fileAbsolutePath,
    source
  );
  const relativeToRootFolder = path.relative(rootFolder, source);
  const relativeToCurrentSlug = path.relative(edge.node.fields.path, target);

  const absoluteTarget = `/${target}`;

  return {
    ...relativeLinks,
    [relativeToCurrentFile]: absoluteTarget,
    [relativeToCurrentFile]: absoluteTarget,
    [relativeToRootFolder]: absoluteTarget,
    [relativeToCurrentSlug]: absoluteTarget,
    [target]: absoluteTarget
  };
}

// Walks all markdown nodes and creates a doc page for each node
function createDocPages({ graphql, actions }) {
  const { createPage } = actions;

  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fileAbsolutePath
              frontmatter {
                tags
                category
              }
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
    const rootFolder = result.data.site.siteMetadata.config.ROOT_FOLDER;
    const pathToSlug = result.data.allMarkdownRemark.edges.map(({ node }) => ({
      source: node.fileAbsolutePath,
      target: node.fields.slug
    }));

    const tagSet = new Set();
    const categorySet = new Set();
    result.data.allMarkdownRemark.edges.forEach(edge => {
      if (edge.node.frontmatter.tags) {
        edge.node.frontmatter.tags.forEach(tag => {
          tagSet.add(tag);
        });
      }

      if (edge.node.frontmatter.category) {
        categorySet.add(edge.node.frontmatter.category);
      }

<<<<<<< HEAD
      let relativeLinks = {};
      pathToSlug.forEach(({ source, target }) => {
        relativeLinks = addToRelativeLinks({
          source,
          target,
          rootFolder,
          edge,
          relativeLinks
        });
      });
=======
      const relativeLinks = pathToSlug.reduce((prev, { source, target }) => {
        // what we are doing here: for each markdown file, we create a mapping of different ways to
        // link to another markdown file that we will honor.

        // let's suppose that we want to go from a file:
        // - physical location: /docs/my-files/source.md, slug: /docs/chapter-1/source
        // to this file:
        // - phyiscal location: /docs/developer-guide/target.md, slug: /docs/advanced-usage/api-reference/target

        // by default, '../../advanced-usage/api/reference/target' would work (target file slug, relative to original slug)
        // '/docs/advanced-usage/api-reference/target' would also work (absolute target slug)
        // however, on github, those links wouldn't work as there is no phyiscal file behind that link.
        // in github however: '/docs/developer-guide/target.md' (file name relative to root) or
        // '../developer-guide/target.md' (relative file name) would work. Those links wouldn't work on the gatsby rendered
        // page however (until that).

        // we are creating a mapping so that ANY OF THESE 4 SYNTAXES would be honored.
        // So, authors can use links that refer to physical files, and gatsby will render a link that works - the same link
        // can work on github and gatsby

        // note that often, the physical location and the slug are the same!
        // However there is no guarantee that this will be the case.

        const relativeToCurrentFile = path.relative(
          edge.node.fileAbsolutePath,
          source
        );
        const relativeToRootFolder = path.relative(rootFolder, source);
        const relativeToCurrentSlug = path.relative(
          edge.node.fields.path,
          target
        );

        const absoluteTarget = `/${target}`;

        return {
          ...prev,
          [relativeToCurrentFile]: absoluteTarget,
          [relativeToRootFolder]: absoluteTarget,
          [relativeToCurrentSlug]: absoluteTarget,
          [target]: absoluteTarget
        };
      }, {});
>>>>>>> rewrite local links

      // console.log('Creating doc page at', edge.node.fields.path);

      createPage({
        path: edge.node.fields.path,
        component: DOC_PAGE,
        context: {
          relativeLinks,
          slug: edge.node.fields.path,
          toc: 'docs'
        }
      });
    });
  });
}
