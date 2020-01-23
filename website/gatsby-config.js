const {resolve} = require('path');

// default location for table of contents
const DOCS = require('../docs/table-of-contents.json');

module.exports = {
  plugins: [{
    resolve: 'gatsby-theme-ocular',
    options: {
      // Adjusts amount of debug information from gatsby-theme-ocular
      logLevel: 1,

      DOC_FOLDER: `${__dirname}/../docs/`,
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

      HOME_PATH: '/',
      LINK_TO_GET_STARTED: '/docs',
      HOME_MARKDOWN: resolve('./src/home.md'),

      // your table of contents goes here
      DOCS,

      EXAMPLES: [
        {
          title: 'Minimal Example',
          path: 'examples/minimal/',
          image: 'images/hero.jpg',
          componentUrl: resolve('../examples/minimal/app.js')
        }
      ],

      // THEME_OVERRIDES: require('./src/theme.json'),

      PROJECTS: [
        // {name: 'Project name', url: 'http://project.url'},
      ],
      ADDITIONAL_LINKS: [
        // {name: 'link label', href: 'http://link.url'}
      ],

      GA_TRACKING: null,

      // For showing star counts and contributors.
      // Should be like btoa('YourUsername:YourKey') and should be readonly.
      GITHUB_KEY: null
    }
  }]
};
