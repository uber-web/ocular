/* eslint-disable max-len */
import test from 'tape-catch';
import validateConfig from '../../src/utils/validate-config';
import CONFIG_SCHEMA from '../../src/gatsby-config/config-schema';

const GOOD_CONFIG = {
  logLevel: 4,
  DOC_FOLDERS: [],
  ROOT_FOLDER: `/`,
  DIR_NAME: '/',
  EXAMPLES: [],
  DOCS: {},
  PROJECT_TYPE: '',
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
    }
  ],
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

test('validateConfig', t => {
  t.deepEquals(
    validateConfig(GOOD_CONFIG, CONFIG_SCHEMA),
    [],
    'Get zero error when config is valid'
  );

  t.deepEquals(
    validateConfig({}, CONFIG_SCHEMA),
    [
      'Examples can\'t be blank',
      'Docs DOCS needs to be an object.',
      'Project type can\'t be blank',
      'Project url can\'t be blank',
      'Project desc can\'t be blank,Project desc should be the project\'s description',
      'Path prefix should be the prefix added to all paths on the site',
      'Home heading can\'t be blank,Home heading should be ...',
      'Home bullets can\'t be blank,Home bullets HOME_BULLETS needs to be an array.',
      'Theme overrides THEME_OVERRIDES needs to be an array.',
      'Additional links can\'t be blank',
      'Webpack webpack needs to be an object.'
    ],
    'Get all errors when config is empty'
  );

  // will deprecated configs
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        DOC_FOLDER: './docs'
      },
      CONFIG_SCHEMA
    ),
    ['DOC_FOLDER will be deprecated soon.'],
    'Check deprecated configs'
  );

  // logLevel
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        logLevel: 6
      },
      CONFIG_SCHEMA
    ),
    ['Log level must be less than or equal to 5'],
    'Check logLevel'
  );

  // PROJECTS
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        PROJECTS: [{title: 'Project 1', url: ''}]
      },
      CONFIG_SCHEMA
    ),
    ['Projects PROJECTS[0]: Url is not a valid url'],
    'Check PROJECTS with empty url'
  );

  // PROJECT_URL
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        PROJECT_URL: null
      },
      CONFIG_SCHEMA
    ),
    ["Project url can't be blank"],
    'Check if PROJECT_URL is null'
  );

  // HOME_BULLETS
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        HOME_BULLETS: [{text: 'Project 1', desc: '', img: ''}]
      },
      CONFIG_SCHEMA
    ),
    ["Home bullets HOME_BULLETS[0]: Img can't be blank"],
    'Check HOME_BULLETS with empty img'
  );

  // ADDITIONAL_LINKS
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        ADDITIONAL_LINKS: [{index: 0, name: 'Project 1', href: ''}]
      },
      CONFIG_SCHEMA
    ),
    ["Additional links ADDITIONAL_LINKS[0]: Href can't be blank"],
    'Check ADDITIONAL_LINKS with empty href'
  );

  // GITHUB_KEY
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        PROJECT_TYPE: 'github',
        GITHUB_KEY: null
      },
      CONFIG_SCHEMA
    ),
    ['Github key must be provided if your project is hosted on Github.'],
    'Check if PROJECT_TYPE == github and GITHUB_KEY is null'
  );

  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        PROJECT_TYPE: '',
        GITHUB_KEY: null
      },
      CONFIG_SCHEMA
    ),
    [],
    `Check if PROJECT_TYPE == '' and GITHUB_KEY is null`
  );

  // THEME_OVERRIDES
  t.deepEquals(
    validateConfig(
      {
        ...GOOD_CONFIG,
        THEME_OVERRIDES: []
      },
      CONFIG_SCHEMA
    ),
    ['Theme overrides THEME_OVERRIDES cannot be empty.'],
    'Check if THEME_OVERRIDES is empty'
  );

  t.end();
});
