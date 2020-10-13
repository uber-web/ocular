const {log, COLOR} = require('../utils/log');

function sourceNodes({actions}) {
  const {createTypes} = actions;
  // see https://graphql-compose.github.io/en/ for instructions on how to create types
  // see https://www.gatsbyjs.org/blog/2019-03-04-new-schema-customization/ for information on schema customization

  // these type definitions support the site metadata and table of contents.
  // when gastby tries to infer these schemas from contents as it is read,
  // it requires it to have a very strict shape by defining the schema independently
  // of the content of the file we can be more flexible.

  // Having ImageSharp type is to enfore the `allImageSharp` node exists in the schema
  // Original disussion: https://github.com/gatsbyjs/gatsby/issues/14304
  // PR: https://github.com/uber-web/ocular/pull/195
  const typeDefs = `

    type Examples implements Node {
      category: String
      title: String
      componentUrl: String
      path: String
      image: String
    }

    type HomeBullets implements Node {
      text: String
      desc: String
      img: String
    }

    type AdditionalLinks implements Node {
      name: String
      href: String
      index: Int
    }

    type PageDesc implements Node {
      path: String
      componentUrl: String
      content: String
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
      HOME_PATH: String

      HEADER_LINK_URL: String

      PROJECT_ORG_LOGO: String

      PAGES: [PageDesc]

      ROOT_FOLDER: String
      DOC_FOLDER: String
      DOC_FOLDERS: [String]
      CODESANDBOX_FOLDER: String

      GA_TRACKING_ID: String
      GITHUB_KEY: String
      ADDITIONAL_LINKS: [AdditionalLinks]
      LINK_TO_GET_STARTED: String
      PROJECTS: [Projects]
      EXAMPLES: [Examples]
      STYLESHEETS: [String]

      siteUrl: String
      pathPrefix: String
      dateFromFormat: String
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

    type EntryHeading implements Node {
      value: String
    }

    type EntrychildMdx implements Node {
      frontmatter: EntryFrontMatter
      fields: EntryFields
      headings: [EntryHeading]
    }

    type Entry implements Node {
      childMdx: EntrychildMdx
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

    type ImageSharp implements Node {
      id: ID!
    }
    `;
  log.log({color: COLOR.YELLOW}, `Set up graphql schemas`)();
  log.log({priority: 4, color: COLOR.YELLOW}, `Schemas:`, typeDefs)();
  createTypes(typeDefs);
}

module.exports = sourceNodes;
