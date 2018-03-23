module.exports = res => `export const PROJECT_TYPE = '${res.type}';

export const PROJECT_NAME = '${res.name}';
${res.type === 'github' ? `export const PROJECT_ORG = \'${res.org}\';` : ''}
export const PROJECT_URL = ${res.type === 'github' ? '`https://github.com/${PROJECT_ORG}/${PROJECT_NAME}`' : `'${res.phabUrl}'`};
export const PROJECT_DESC = '${res.desc}';

export const PROJECTS = {};

export const HOME_PATH = '/';

export const HOME_HEADING = '${res.desc}';

export const HOME_RIGHT = null;

export const HOME_BULLETS = [{
  text: 'Designed for React',
  desc: 'Seemless integration.',
  img: 'images/icon-react.svg',
}, {
  text: 'Totally ready for production',
  img: 'images/icon-layers.svg',
}];

export const ADDITIONAL_LINKS = [];

export const GA_TRACKING = null;
`;
