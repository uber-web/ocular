const resolve = require('path').resolve;

const DOCS = require('../docs/table-of-contents.json');
const DEPENDENCIES = require('./package.json').dependencies;
// eslint-disable-next-line import/no-extraneous-dependencies
const ALIASES = {};
// require('ocular-dev-tools/config/ocular.config')({
//   root: resolve(__dirname, '..')
// }).aliases;

// When duplicating example dependencies in website, autogenerate
// aliases to ensure the website version is picked up
// NOTE: module dependencies are automatically injected
// TODO - should this be automatically done by ocular-gatsby?
const dependencyAliases = {};
for (const dependency in DEPENDENCIES) {
  dependencyAliases[dependency] = `${__dirname}/node_modules/${dependency}`;
}

module.exports = {
  logLevel: 4,

  DOC_FOLDER: `${__dirname}/../docs/`,
  ROOT_FOLDER: `${__dirname}/../`,
  DIR_NAME: `${__dirname}`,

  EXAMPLES: [],
  DOCS,

  // TODO/ib - from ocular, deduplicate with above settings
  PROJECT_TYPE: 'github',

  PROJECT_NAME: 'ocular',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'https://github.com/uber-web/ocular',
  PROJECT_DESC: 'A documentation website for Ocular, made with Ocular',
  PATH_PREFIX: '/ocular',

  FOOTER_LOGO: '',

  PROJECTS: [],

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

  ADDITIONAL_LINKS: [
    {name: 'google', href: 'https://google.com'}
  ],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null,

  // Avoids duplicate conflicting inputs when importing from examples folders
  // Ocular adds this to gatsby's webpack config
  webpack: {
    resolve: {
      // modules: [resolve(__dirname, './node_modules')],
      alias: Object.assign({}, ALIASES, dependencyAliases)
      // Local aliases need to be set in local gatsby node!
    }
  }
};
