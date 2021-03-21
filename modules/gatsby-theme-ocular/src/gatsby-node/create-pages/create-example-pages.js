const {log, COLOR} = require('../../utils/log');

const PAGE_TEMPLATES = require('./page-templates');

// assert(CONFIG.EXAMPLES_GALLERY_TEMPLATE_URL && EXAMPLE_TEMPLATE_URL);

// Exracts thumbnails from the sharp query
function getExampleThumbnails({allFile, allImageSharp}) {
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
    log.log({color: COLOR.YELLOW, priority: 1}, `No thumbnails created.`)();
    return {};
  }
  // in a first pass, we create a lookup - original path to internal gatsby node id.
  /* eslint-disable no-param-reassign */
  const idLookup = allFile.edges.reduce((lookup, {node}) => {
    lookup[node.id] = node.relativePath;
    return lookup;
  }, {});

  // in a second path, we associate each thumbnail with the path of the original
  // image, using the node id of this original image and the lookup
  // we just created.

  const pathLookup = allImageSharp.edges.reduce((lookup, {node}) => {
    const originalImageId = node.parent.id;
    const originalImagePath = idLookup[originalImageId];
    lookup[originalImagePath] = node.resize.src;
    return lookup;
  }, {});

  /* eslint-enable no-param-reassign */
  return pathLookup;
}

// Queries for examples list and thumbnail images
// First try to query for images, if failure try again without images
// TODO - figure out how to inject a valid schema for sharp so we don't get exceptions
function queryExamplesData(graphql) {
  return graphql(`
    {
      site {
        siteMetadata {
          config {
            EXAMPLES {
              category
              image
              title
              path
              componentUrl
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
            resize(width: 400, height: 400, quality: 80) {
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
    .then((result) => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        throw new Error(result.errors);
      }

      const {EXAMPLES} = result.data.site.siteMetadata.config;
      // build a lookup map that matches relative paths of images with their public URLs
      const thumbnailsPublicUrls = getExampleThumbnails(result.data);

      // matches public urls to paths of images
      const examplesWithImages = EXAMPLES.map((example) => ({
        ...example,
        imageSrc: thumbnailsPublicUrls[example.image]
      }));

      return examplesWithImages;
    })
    .catch((error) => {
      log.log({color: COLOR.BRIGHT_YELLOW}, `error in createPage query with images: ${error}`)();
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
      `).then((result) => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          throw new Error(result.errors);
        }
        const {EXAMPLES} = result.data.site.siteMetadata.config;
        return EXAMPLES;
      });
    });
}

function createExampleGalleryPage(examples, examplesToc, createPage, ocularOptions) {
  if (examples.length === 0) {
    return;
  }
  log.log({color: COLOR.CYAN, priority: 1}, `Creating examples page`)();
  log.log({color: COLOR.RED, priority: 4}, `with data ${JSON.stringify(examples)}`)();

  const componentUrl = PAGE_TEMPLATES['EXAMPLE_GALLERY_PAGE_URL'];

  createPage({
    component: componentUrl,
    path: '/examples',
    context: {
      title: 'Examples',
      toc: examplesToc
    }
  });
}

function createIndividualExamplePages(examples, examplesToc, createPage, ocularOptions) {
  examples.forEach((example) => {
    const exampleName = example.title;

    log.log({color: COLOR.CYAN, priority: 1}, `Creating example page ${example.title}}`)();

    const componentUrl = example.componentUrl;

    if (componentUrl) {
      createPage({
        path: example.path,
        component: componentUrl,
        context: {
          title: `${example.title} Example`,
          slug: example.path,
          toc: examplesToc,
          exampleConfig: example
        }
      });
    }
  });
}

function createExamplesToc(examples) {
  const examplesByCategory = {};

  for (const example of examples) {
    examplesByCategory[example.category] = examplesByCategory[example.category] || {
      title: example.category,
      entries: []
    };

    examplesByCategory[example.category].entries.push({
      title: example.title,
      path: example.path,
      image: example.imageSrc
    });
  }

  return Object.values(examplesByCategory);
}

module.exports = function createExamplePages({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  return queryExamplesData(graphql).then((examples) => {
    const examplesToc = createExamplesToc(examples);
    createExampleGalleryPage(examples, examplesToc, createPage, ocularOptions);
    createIndividualExamplePages(examples, examplesToc, createPage, ocularOptions);
  });
};
