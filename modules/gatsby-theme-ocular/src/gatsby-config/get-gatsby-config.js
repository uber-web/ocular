const urljoin = require('url-join');

const {log, COLOR} = require('../utils/log');
const validateConfig = require('../utils/validate-config');
const CONFIG_SCHEMA = require('./config-schema');

const defaults = {
  logLevel: 3,
  DOC_FOLDERS: [],
  ROOT_FOLDER: './',
  SOURCE: 'website/src',
  EXAMPLES: [],
  DOCS: {},
  LINK_TO_GET_STARTED: '/docs',
  PROJECT_TYPE: '',
  PROJECT_NAME: 'Ocular',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'http://localhost/',
  PROJECT_DESC: '',
  PAGES: [],
  PATH_PREFIX: '/',
  PROJECT_IMAGE: '',
  PROJECT_ORG_LOGO: '',
  PROJECTS: [],
  HOME_PATH: '/',
  THEME_OVERRIDES: '',
  STYLESHEETS: [],
  ADDITIONAL_LINKS: [],
  GA_TRACKING_ID: null,
  GITHUB_KEY: null,
  webpack: {}
};

const remarkPlugins = [
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
  'gatsby-remark-responsive-iframe',
  // Adds syntax highlighting to code blocks in markdown files using PrismJS.
  // To load a theme, just require its CSS file in your gatsby-browser.js file, e.g.
  // require('prismjs/themes/prism-solarizedlight.css')
  'gatsby-remark-prismjs',
  // Copies local files linked to/from markdown to your public folder.
  'gatsby-remark-copy-linked-files',
  // Adds GitHub-style hover links to headers in your markdown files when they’re rendered.
  {
    resolve: 'gatsby-remark-autolink-headers',
    options: {
      offsetY: 64,
      removeAccents: true,
      enableCustomId: true
    }
  }
];

module.exports = function getGatsbyConfig(config) {
  const {logLevel = 0} = config;
  log.priority = logLevel;

  log.log({color: COLOR.CYAN, priority: 0}, 'Loading gatsby config')();
  log.log(
    {color: COLOR.CYAN, priority: 4},
    `GATSBY CONFIG ${JSON.stringify(config, null, 3)}`
  )();

  // TODO/javidhsueh: we might want to throw an error if the config is invalid
  // Right now we only print out warning/error messages

  // config padding
  // those values are required to support the query in ../site-query.jsx
  // if they don't exist, we provide empty values so that the query won't fail
  const paddedConfig = {
    ...defaults,
    ...config
  };
  // validate the entire config and print the errors/warnings in the console
  validateConfig(paddedConfig, CONFIG_SCHEMA);

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
      // Exposes several image processing functions built on the Sharp image processing library.
      // This is a low-level helper plugin generally used by other Gatsby plugins.
      // You generally shouldn't be using this directly unless doing custom image processing.
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',

      // Register plugins used by MDX
      ...remarkPlugins,

      // Transforms markdown (.md, .mdx) nodes, converting the raw markdown to HTML
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: [`.md`, `.mdx`],
          // These are sub-plugins for gatsby-plugin-mdx
          gatsbyRemarkPlugins: remarkPlugins
        }
      },

      // Transforms JSON files in the data source into JSON nodes
      'gatsby-transformer-json'

    ]
  };

  // Generates gatsby nodes for markdown files and JSON file in the in the docs folder
  const docDirs = [paddedConfig.DOC_FOLDER]
    .concat(paddedConfig.DOC_FOLDERS)
    .filter(Boolean);

  if (docDirs.length > 0) {
    // Generates gatsby nodes for markdown files and JSON file in the in the docs folder
    for (const path of docDirs) {
      gatsbyConfig.plugins.push({
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path,
          // Ensure gatsby-source-filesystem doesn't pick up too many files in modules directory
          // https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#options
          ignore: [
            '**/src/**',
            '**/test/**',
            '**/dist/**',
            '**/package.json',
            '**/*.js'
          ]
        }
      });
    }
  } else {
    log.log(
      {color: COLOR.YELLOW},
      `DOC_FOLDERS not specified in gatsby-theme-ocular config}`
    )();
  }

  if (paddedConfig.SOURCE) {
    // Generates gatsby nodes for files in the website's src folder
    const srcDirs = Array.isArray(paddedConfig.SOURCE)
      ? paddedConfig.SOURCE
      : [paddedConfig.SOURCE];
    for (const path of srcDirs) {
      gatsbyConfig.plugins.push({
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'src',
          path
        }
      });
    }
  } else {
    log.log(
      {color: COLOR.YELLOW},
      `SOURCE not found in gatsby-theme-ocular config}`
    )();
  }

  if (paddedConfig.THEME_OVERRIDES) {
    // GraphQL does not handle arbitrary objects
    paddedConfig.THEME_OVERRIDES = JSON.stringify(paddedConfig.THEME_OVERRIDES);
  }

  log.log(
    {color: COLOR.CYAN, priority: 2},
    `GENERATED GATSBY CONFIG: ${JSON.stringify(gatsbyConfig, null, 2)}`
  )();
  return gatsbyConfig;
};
