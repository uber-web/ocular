const urljoin = require('url-join');

const {log, COLOR} = require('../utils/log');
const {validateConfig} = require('../utils/validate-config');
const CONFIG_SCHEMA = require('./config-schema');

const defaults = {
  logLevel: 3,
  DOC_FOLDER: '/docs',
  ROOT_FOLDER: './',
  DIR_NAME: 'website',
  EXAMPLES: [],
  DOCS: {},
  PROJECT_TYPE: '',
  PROJECT_NAME: 'Ocular',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'http://localhost/',
  PROJECT_DESC: '',
  PATH_PREFIX: '/',
  FOOTER_LOGO: '',
  PROJECTS: [],
  HOME_PATH: '/',
  HOME_HEADING: 'A documentation website made with Ocular',
  HOME_RIGHT: null,
  // TODO(@javidhsueh): not sure why HOME_BULLETS can't be an empty array
  HOME_BULLETS: [{text: '', desc: '', img: ''}],
  // TODO(@javidhsueh): not sure why THEME_OVERRIDES can't be an empty array
  THEME_OVERRIDES: [
    {
      key: 'none',
      value: 'none'
    }
  ],
  ADDITIONAL_LINKS: [],
  GA_TRACKING: null,
  GITHUB_KEY: null,
  webpack: {}
};

module.exports = function getGatsbyConfig(config) {
  const {logLevel = 0} = config;
  log.priority = logLevel;

  log.log({color: COLOR.CYAN, priority: 0}, 'Loading gatsby config')();
  log.log(
    {color: COLOR.CYAN, priority: 2},
    `GATSBY CONFIG ${JSON.stringify(config, null, 3)}`
  )();

  // validate the entire config and print the errors/warnings in the console
  validateConfig(config, CONFIG_SCHEMA);

  // config padding
  // those values are required to support the query in ../site-query.jsx
  // if they don't exist, we provide empty values so that the query won't fail
  const paddedConfig = {
    ...defaults,
    ...config
  };

  const gatsbyConfig = {
    pathPrefix: paddedConfig.PATH_PREFIX,

    // Site Metadata is populated from config (and react-helmet, see gatsby-plugin-react-helmet)
    siteMetadata: {
      config: paddedConfig,

      siteUrl: urljoin(paddedConfig.PROJECT_URL, paddedConfig.PATH_PREFIX)
    },

    plugins: [
      // Reads metadata from the React Helmet component
      'gatsby-plugin-react-helmet',

      // A Gatsby plugin for styled-components with built-in server-side rendering support.
      'gatsby-plugin-styled-components',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      // Drop-in support for SASS/SCSS stylesheets
      {
        resolve: `gatsby-plugin-sass`
        /*
        options: {
          includePaths: [
            path.resolve(__dirname, '../../styles'),
            path.resolve(__dirname, '../../../styles')
          ],
        }
        */
      },

      /*
      // Bring Google Fonts to Gatsby.
      {
        resolve: `gatsby-plugin-google-fonts`,
        options: {
          fonts: [`crimson text:400, 400i, 700, 700i`, `space mono:400,700`]
        }
      },
      */

      // Generates gatsby nodes for files in the ocular static folder
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'assets',
          path: `${__dirname}/../../static/`
        }
      },

      // Generates gatsby nodes for markdown files and JSON file in the in the docs folder
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path: paddedConfig.DOC_FOLDER
        }
      },

      // Transforms markdown (.md) nodes, converting the raw markdown to HTML
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          // These are sub-plugins for gatsby-transformer-remark
          plugins: [
            // Processes images in markdown so they can be used in the production build.
            // In the processing, it make images responsive by:
            // Adding an elastic container to hold the size of the image while it loads
            // to avoid layout jumps. Generating multiple versions of images at different
            // widths and sets the srcset and sizes of the img element so regardless
            // of the width of the device, the correct image is downloaded.
            // Using the 'blur up' technique popularized by Medium and Facebook where a small
            // 20px wide version is shown as placeholder until actual image is downloaded.
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 690
              }
            },
            // Wraps iframes or objects (e.g. embedded YouTube videos) within markdown files
            // in a responsive elastic container with a fixed aspect ratio. This ensures that
            // the iframe or object will scale proportionally and to the full width of its container.
            {
              resolve: 'gatsby-remark-responsive-iframe'
            },
            // Adds syntax highlighting to code blocks in markdown files using PrismJS.
            // To load a theme, just require its CSS file in your gatsby-browser.js file, e.g.
            // require('prismjs/themes/prism-solarizedlight.css')
            'gatsby-remark-prismjs',
            // Copies local files linked to/from markdown to your public folder.
            'gatsby-remark-copy-linked-files',
            // Adds GitHub-style hover links to headers in your markdown files when they’re rendered.
            'gatsby-remark-autolink-headers'
          ]
        }
      },

      /*
      // Configures google analytics
      {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          trackingId: paddedConfig.googleAnalyticsID
        }
      },

      // Automatically shows the nprogress indicator when a page is delayed in loading
      // (which Gatsby considers as one second after clicking on a link).
      {
        resolve: 'gatsby-plugin-nprogress',
        options: {
          color: paddedConfig.themeColor
        }
      },

      */

      // Exposes several image processing functions built on the Sharp image processing library.
      // This is a low-level helper plugin generally used by other Gatsby plugins.
      // You generally shouldn't be using this directly unless doing custom image processing.
      'gatsby-plugin-sharp',

      /*
      // Intercepts local links from markdown and other non-react pages and
      // does a client-side pushState to avoid the browser having to refresh the page.
      'gatsby-plugin-catch-links',

      // Create a sitemap for your Gatsby site.
      'gatsby-plugin-sitemap',

      */

      // Transforms JSON files in the data source into JSON nodes
      {
        resolve: `gatsby-transformer-json`
        // options: {
        //   typeName: ({ node, object, isArray }) =>
        //     console.log('json', node, object, isArray) && object.level,
        // },
      },

      {
        resolve: `gatsby-plugin-env-variables`,
        options: {
          whitelist: ['MapboxAccessToken']
        }
      }

      /*
      // Gatsby’s manifest plugin creates a manifest.webmanifest file on every build.
      // Improves Progressive Web App performance
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: paddedConfig.PROJECT_NAME,
          short_name: paddedConfig.siteTitleShort,
          description: paddedConfig.PROJECT_DESC,
          start_url: paddedConfig.pathPrefix,
          background_color: paddedConfig.backgroundColor,
          theme_color: paddedConfig.themeColor,
          display: 'minimal-ui',
          icons: [
            {
              src: '/logos/logo-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/logos/logo-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      },

      // Drop-in support for making site work offline and more resistant to bad network connections.
      // It creates a service worker for the site and loads the service worker into the client.
      // Comes after gatsby-plugin-manifest if present (sp manifest can be used in service worker)
      'gatsby-plugin-offline',

      */

      // Create an RSS feed (or multiple feeds) for your Gatsby site.
      /* TODO/ib
      {
        resolve: 'gatsby-plugin-feed',
        options: {
          setup(ref) {
            const ret = ref.query.site.siteMetadata.rssMetadata;
            ret.allMarkdownRemark = ref.query.allMarkdownRemark;
            ret.generator = 'GatsbyJS Material Starter';
            return ret;
          },
          query: `
          {
            site {
              siteMetadata {
                rssMetadata {
                  site_url
                  feed_url
                  title
                  description
                  image_url
                  author
                  copyright
                }
              }
            }
          }
        `,
          feeds: [
            {
              serialize(ctx) {
                const { rssMetadata } = ctx.query.site.siteMetadata;
                return ctx.query.allMarkdownRemark.edges.map(edge => ({
                  categories: edge.node.frontmatter.tags,
                  date: edge.node.fields.date,
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  author: rssMetadata.author,
                  url: rssMetadata.site_url + edge.node.fields.slug,
                  guid: rssMetadata.site_url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                }));
              },
              query: `
              {
                allMarkdownRemark(
                  filter(sourceInstanceName = 'posts')
                  limit: 1000,
                  sort: { order: DESC, fields: [fields___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      timeToRead
                      fields {
                        slug
                        date
                      }
                      frontmatter {
                        title
                        cover
                        date
                        category
                        tags
                      }
                    }
                  }
                }
              }
            `,
              output: paddedConfig.siteRss
            }
          ]
        }
      }
      */
    ]
  };

  // conditional plug-ins - only added depending on options on config

  if (paddedConfig.DIR_NAME) {
    // Generates gatsby nodes for files in the website's src folder
    gatsbyConfig.plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${paddedConfig.DIR_NAME}/src/`
      }
    });
    gatsbyConfig.plugins.push({
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${paddedConfig.DIR_NAME}/static/`
      }
    });
  } else {
    log.log(
      {color: COLOR.YELLOW},
      `DIR_NAME not found in ocular-gatsby config}`
    )();
  }

  // log.log({color: COLOR.CYAN}, `GATSBY CONFIG ${JSON.stringify(gatsbyConfig, null, 3)}`)();
  return gatsbyConfig;
};
