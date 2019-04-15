const path = require('path');
const { log, COLOR } = require('../utils/log');

const EXAMPLES_PAGE = path.resolve(__dirname, '../templates/examples.jsx');
const EXAMPLE_PAGE = path.resolve(__dirname, '../templates/example-n.jsx');

function getExampleThumbnails({ allFile, allImageSharp }) {
  // this function associates the path of an original image
  // with the public url of a thumbnail, resized server side by imageSharp.
  if (
    !allFile ||
    !allFile.edges ||
    !allFile.edges.length ||
    !allImageSharp ||
    !allImageSharp.edges ||
    !allImageSharp.edges.length
  ) {
    log.log({ color: COLOR.YELLOW, priority: 1 }, `No thumbnails created.`)();
    return {};
  }
  // in a first pass, we create a lookup - original path to internal gatsby node id.
  /* eslint-disable no-param-reassign */
  const idLookup = allFile.edges.reduce((lookup, { node }) => {
    lookup[node.id] = node.relativePath;
    return lookup;
  }, {});

  // in a second path, we associate each thumbnail with the path of the original
  // image, using the node id of this original image and the lookup
  // we just created.

  const pathLookup = allImageSharp.edges.reduce((lookup, { node }) => {
    const originalImageId = node.parent.id;
    const originalImagePath = idLookup[originalImageId];
    lookup[originalImagePath] = node.resize.src;
    return lookup;
  }, {});

  /* eslint-enable no-param-reassign */
  return pathLookup;
}

function createExampleGalleryPage(EXAMPLES, thumbnailsPublicUrls = {}, createPage) {
  if (EXAMPLES.length === 0) {
    return;
  }
  // matches public urls to paths of images
  const examplesWithImage = EXAMPLES.map(example => ({
    ...example,
    imageSrc: thumbnailsPublicUrls[example.image]
  }));

  createPage({
    component: EXAMPLES_PAGE,
    path: '/examples',
    context: {
      toc: 'examples',
      examples: examplesWithImage
    }
  });
}

function createIndividualExamplePages(EXAMPLES, createPage) {
  EXAMPLES.forEach(example => {
    const exampleName = example.title;

    log.log(
      { color: COLOR.CYAN, priority: 1 },
      `Creating example page ${JSON.stringify(example)}`
    )();

    const {ocularConfig} = global;
    const exampleComponentUrl = (ocularConfig && ocularConfig.EXAMPLE_TEMPLATE_URL) || EXAMPLE_PAGE;

    createPage({
      path: example.path,
      component: exampleComponentUrl,
      context: {
        slug: exampleName,
        toc: 'examples'
      }
    });
  });
}

module.exports = function prepareExamplePages({ graphql, actions }) {
  const { createPage } = actions;
  return graphql(`
    {
      site {
        siteMetadata {
          config {
            EXAMPLES {
              image
              title
              path
            }
          }
        }
      }
      allImageSharp {
        edges {
          node {
            parent {
              id
            }
            resize(width: 150, height: 150) {
              src
            }
          }
        }
      }
      allFile {
        edges {
          node {
            id
            relativePath
          }
        }
      }
    }
  `)
    .then(result => {
      console.log(result);

      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        throw new Error(result.errors);
      }
      const { EXAMPLES } = result.data.site.siteMetadata.config;
      // build a lookup map that matches relative paths of images with their public URLs
      const thumbnailsPublicUrls = getExampleThumbnails(result.data);
      // If the no examples marker, return without creating pages
      createExampleGalleryPage(EXAMPLES, thumbnailsPublicUrls, createPage);
      createIndividualExamplePages(EXAMPLES, createPage);
    })
    .catch(error => {
      log.log(
        { color: COLOR.BRIGHT_YELLOW },
        `error in createPage query with images: ${error}`
      )();
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
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          throw new Error(result.errors);
        }
        const { EXAMPLES } = result.data.site.siteMetadata.config;
        createIndividualExamplePages(EXAMPLES, {}, createPage);
      });
    });
};
