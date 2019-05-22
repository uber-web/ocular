/* eslint-disable max-len */
import test from 'tape-catch';

import {validateConfig} from 'ocular-gatsby';

const GOOD_CONFIG = {
  logLevel: 4,
  DOC_FOLDER: `./docs/`,
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
  THEME_OVERRIDES: [],

  ADDITIONAL_LINKS: [],
  GA_TRACKING: null,
  GITHUB_KEY: null,
  webpack: {}
};

test('validateConfig', t => {
  t.deepEquals(
    validateConfig(GOOD_CONFIG),
    [],
    'Get zero error when config is valid'
  );

  t.deepEquals(
    validateConfig({}),
    [
      'Doc folder should be the local path to the doc folder.',
      'Root folder should be the local path to the root folder.',
      'Dir name should be the local path to the gatsby website folder.',
      "Examples can't be blank,Examples EXAMPLES needs to be an array.",
      'Docs DOCS needs to be an object.',
      "Project type can't be blank",
      "Project name should be the project's name on Github.",
      "Project org should be the project's Github organization",
      "Project url can't be blank",
      "Project desc can't be blank,Project desc should be the project's description",
      'Path prefix should be the prefix added to all paths on the site',
      'Footer logo should be the local path to foorter logo',
      'Projects PROJECTS needs to be an array.',
      'Home path should be the path to the home page',
      "Home heading can't be blank,Home heading should be ...",
      'Home right should be ...',
      "Home bullets can't be blank,Home bullets HOME_BULLETS needs to be an array.",
      'Theme overrides THEME_OVERRIDES needs to be an array.',
      "Additional links can't be blank,Additional links ADDITIONAL_LINKS needs to be an array.",
      'Ga tracking should be the Google analytics key',
      'Webpack webpack needs to be an object.'
    ],
    'Get all errors when config is empty'
  );

  // logLevel
  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      logLevel: 6
    }),
    ['Log level must be less than or equal to 5'],
    'Check logLevel'
  );

  // PROJECTS
  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      PROJECTS: [{title: 'Project 1', url: ''}]
    }),
    ['Projects PROJECTS[0]: Url is not a valid url'],
    'Check PROJECTS with empty url'
  );

  // PROJECT_URL
  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      PROJECT_URL: null
    }),
    ["Project url can't be blank"],
    'Check if PROJECT_URL is null'
  );

  // HOME_BULLETS
  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      HOME_BULLETS: [{text: 'Project 1', desc: '', img: ''}]
    }),
    ["Home bullets HOME_BULLETS[0]: Img can't be blank"],
    'Check HOME_BULLETS with empty img'
  );

  // ADDITIONAL_LINKS
  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      ADDITIONAL_LINKS: [{index: 0, name: 'Project 1', href: ''}]
    }),
    ["Additional links ADDITIONAL_LINKS[0]: Href can't be blank"],
    'Check ADDITIONAL_LINKS with empty href'
  );

  // GITHUB_KEY
  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      PROJECT_TYPE: 'github',
      GITHUB_KEY: null
    }),
    ['Github key must be provided if your project is hosted on Github.'],
    'Check if PROJECT_TYPE == github and GITHUB_KEY is null'
  );

  t.deepEquals(
    validateConfig({
      ...GOOD_CONFIG,
      PROJECT_TYPE: '',
      GITHUB_KEY: null
    }),
    [],
    `Check if PROJECT_TYPE == '' and GITHUB_KEY is null`
  );

  t.end();
});
