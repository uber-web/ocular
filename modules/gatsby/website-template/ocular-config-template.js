// module.exports = res => `export const PROJECT_TYPE = '${init.type}';

// export const PROJECT_NAME = '${init.name}';
// ${init.type === 'github' ? `export const PROJECT_ORG = \'${init.org}\';` : ''}
// export const PROJECT_URL = ${init.type === 'github' ? '`https://github.com/${PROJECT_ORG}/${PROJECT_NAME}`' : `'${init.otherUrl}'`};
// export const PROJECT_DESC = '${init.desc}';
// export const GITHUB = ${init.type === 'github'};
// export const HOME_HEADING = '${init.desc}';

module.exports = init => `
module.exports = {
  // Adjusts amount of debug information from ocular-gatsby
  logLevel: 4,

  DOC_FOLDER: '${init.websiteFolder}/../docs/',
  ROOT_FOLDER: '${init.websiteFolder}/../',

  EXAMPLES: [
    // {
    //   title: 'my example',
    //   path: 'examples/my-example/',
    //   image: 'images/my-example.jpg',
    //   componentUrl: '../examples/app.js'
    // }
  ],
  DOCS: [
    // your table of contents go there
  ],

  THEME_OVERRIDES: [
    //  {key: 'primaryFontFamily', value: 'serif'}
  ],

  PROJECT_TYPE: '${init.type || 'github'}',
  PROJECT_NAME: '${init.name || 'untitled'}',
  PROJECT_ORG: '${init.org || 'unknown'}',
  PROJECT_URL: '${
    init.type === 'github'
      ? `https://github.com/${init.org}/${init.name}`
      : init.otherUrl
  }',
  PROJECT_DESC: '${init.desc ||
    'A documentation website for Ocular, made with Ocular'}',
  WEBSITE_PATH: '${init.path || '/website/'}',
  PATH_PREFIX: '',

  FOOTER_LOGO: '',

  HOME_PATH: '/',
  HOME_HEADING: '${init.desc || 'A documentation website made with Ocular'}',
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

  PROJECTS: {
    // 'Project name': 'http://project.url',
  },
  ADDITIONAL_LINKS: [
    // {name: 'link label', href: 'http://link.url'}
  ],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null
};
`;
