/* eslint-disable max-len */
import test from 'tape-catch';

import {validateConfig} from 'ocular-gatsby';

const config1 = {
  logLevel: 4,
  DOC_FOLDER: `./docs/`,
  ROOT_FOLDER: `/`,
  DIR_NAME: '/',
  EXAMPLES: [],
  DOCS: {},
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
    }
  ],

  ADDITIONAL_LINKS: [],
  GA_TRACKING: null,
  GITHUB_KEY: null,
  webpack: {}
};

test('validateConfig', t => {
  validateConfig({});
  validateConfig(config1);

  // t.equals(validateConfig({}), 'function', 'getExamples is exported');
  t.end();
});
