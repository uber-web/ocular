const {log, COLOR} = require('../utils/log');

function sourceNodes({actions}) {
  const {createTypes} = actions;
  // see https://graphql-compose.github.io/en/ for instructions on how to create types
  // see https://www.gatsbyjs.org/blog/2019-03-04-new-schema-customization/ for information on schema customization

  // these type definitions support the site metadata and table of contents.
  // when gastby tries to infer these schemas from contents as it is read,
  // it requires it to have a very strict shape by defining the schema independently
  // of the content of the file we can be more flexible.

  const typeDefs = `

    type Examples implements Node {
      title: String
      componentUrl: String
      path: String
      image: String
    }

    type ThemeOverrides implements Node {
      key: String
      value: String
    }

    type HomeBullets implements Node {
      text: String
      desc: String
      img: String
    }

    type AdditionalLinks implements Node {
      name: String
      href: String
    }

    type Projects implements Node {
      name: String
      url: String
    }

    type Config implements Node {
      PROJECT_NAME: String
      PROJECT_TYPE: String
      PROJECT_DESC: String

      PROJECT_URL: String
      WEBSITE_PATH: String

      FOOTER_LOGO: String
      HOME_HEADING: String

      ROOT_FOLDER: String
      DOC_FOLDER: String

      GA_TRACKING: String
      GITHUB_KEY: String
      ADDITIONAL_LINKS: [AdditionalLinks]
      PROJECTS: [Projects]
      HOME_BULLETS: [HomeBullets]
      EXAMPLES: [Examples]
      THEME_OVERRIDES: [ThemeOverrides]

      siteUrl: String
      pathPrefix: String
      dateFromFormat: String
      userName: String
      dateFormat: String
    }

    type SiteMetadata implements Node {
      config: Config
    }

    type Site implements Node {
      siteMetadata: SiteMetadata
    }

    type EntryFrontMatter implements Node {
      title: String
    }

    type EntryFields implements Node {
      slug: String
    }

    type EntrychildMarkdownRemark implements Node {
      frontmatter: EntryFrontMatter
      fields: EntryFields
    }

    type Entry implements Node {
      childMarkdownRemark: EntrychildMarkdownRemark
    }

    type lvl2Chapter implements Node {
      title: String
      level: Int
      entries: [Entry]
    }

    type lvl1Chapter implements Node {
      title: String
      level: Int
      chapters: [lvl2Chapter]
      entries: [Entry]
    }

    type docsJson implements Node {
      chapters: [lvl1Chapter]
      entries: [Entry]
    }

    type DocsJson implements Node {
      chapters: [lvl1Chapter]
      entries: [Entry]
    }
    `;
  log.log({color: COLOR.YELLOW}, `Set up graphql schemas`)();
  log.log({priority: 4, color: COLOR.YELLOW}, `Schemas:`, typeDefs)();
  createTypes(typeDefs);
}

module.exports.sourceNodes = sourceNodes;
