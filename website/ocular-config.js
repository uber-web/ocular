const DOCS = require('../docs/table-of-contents.json');

module.exports = {
  DOC_FOLDER: `${__dirname}/../docs/`,
  ROOT_FOLDER: `${__dirname}/../`,

  EXAMPLES: [],
  DOCS,

  // TODO/ib - from ocular, deduplicate with above settings
  PROJECT_TYPE: 'github',

  PROJECT_NAME: 'ocular',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'https://github.com/uber-web/ocular',
  PROJECT_DESC: 'A documentation website for Ocular, made with Ocular',
  WEBSITE_PATH: '/website/',

  FOOTER_LOGO: '',

  PROJECTS: {},

  HOME_PATH: '/',

  HOME_HEADING: 'A documentation website for Ocular, made with Ocular',

  HOME_RIGHT: null,

  HOME_BULLETS: [
    {
      text: 'Designed for React',
      desc: 'Seamless integration.',
      img: 'images/icon-react.svg'
    },
    {
      text: 'Totally ready for production',
      img: 'images/icon-layers.svg'
    }
  ],

  ADDITIONAL_LINKS: [],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null
};
