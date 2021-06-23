const {resolve} = require('path');

// default location for table of contents
const DOCS = require('../docs/table-of-contents.json');

module.exports = {
  plugins: [{
    resolve: 'gatsby-theme-ocular',
    options: {
      // Adjusts amount of debug information from gatsby-theme-ocular
      logLevel: 1,

      DOC_FOLDERS: [
        `${__dirname}/../docs/`,
        `${__dirname}/../modules/`
      ],
      ROOT_FOLDER: `${__dirname}/../`,
      SOURCE: [
        `${__dirname}/static`,
        `${__dirname}/src`
      ],

      PROJECT_TYPE: 'github',
      PROJECT_NAME: 'Ocular',
      PROJECT_ORG: 'uber-web',
      PROJECT_ORG_LOGO: 'images/uber-logo.png',
      PROJECT_URL: 'https://github.com/uber-web/ocular',
      PROJECT_DESC: 'Uber\'s open source documentation system',
      PATH_PREFIX: '',

      LINK_TO_GET_STARTED: '/docs',
      PAGES: [
        {
          path: '/',
          content: resolve('./src/home.md')
        },
        {
          path: '/about',
          content: resolve('./src/about.md')
        }
      ],

      // your table of contents goes here
      DOCS,

      EXAMPLES: [
        // {
        //   title: 'Minimal Example',
        //   path: 'examples/minimal',
        //   image: 'images/hero.jpg',
        //   componentUrl: resolve(__dirname, '../examples/minimal/app.js')
        // }
      ],

      // THEME_OVERRIDES: require('./src/theme.json'),

      PROJECTS: [
        {name: 'deck.gl', url: 'https://deck.gl'},
        {name: 'luma.gl', url: 'https://luma.gl'},
        {name: 'loaders.gl', url: 'https://loaders.gl'}
      ],
      ADDITIONAL_LINKS: [
        {name: 'About', href: '/about'}
      ],

      GA_TRACKING_ID: 'dummy_tracking_id',

      // For showing star counts and contributors.
      // Should be like btoa('YourUsername:YourKey') and should be readonly.
      GITHUB_KEY: null
    }
  }]
};
