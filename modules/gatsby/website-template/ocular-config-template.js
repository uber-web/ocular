// module.exports = res => `export const PROJECT_TYPE = '${init.type}';

// export const PROJECT_NAME = '${init.name}';
// ${init.type === 'github' ? `export const PROJECT_ORG = \'${init.org}\';` : ''}
// export const PROJECT_URL = ${init.type === 'github' ? '`https://github.com/${PROJECT_ORG}/${PROJECT_NAME}`' : `'${init.otherUrl}'`};
// export const PROJECT_DESC = '${init.desc}';
// export const GITHUB = ${init.type === 'github'};
// export const HOME_HEADING = '${init.desc}';

module.exports = init => `
module.exports = {
  DOC_FOLDER: '${init.websiteFolder}/../docs/',
  ROOT_FOLDER: '${init.websiteFolder}/../',

  EXAMPLES: [
    // {title: 'my example', path: 'examples/my-example/', image: 'images/my-example.jpg'}
  ],
  DOCS: [],

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

  PROJECTS: {},
  ADDITIONAL_LINKS: [],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null,

  // TODO/ib - from gatsby starter, clean up
  siteTitle: "ocular", // Site title.
  siteTitleAlt: "ocular", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://ocular", // Domain of your website without pathPrefix.
  pathPrefix: "/luma", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "WebGL2 Components", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "WebGL User", // Username to display in the author segment.
  copyright: "Copyright © 2017 Uber. MIT Licensed", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
`;
