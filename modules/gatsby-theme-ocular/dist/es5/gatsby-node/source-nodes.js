"use strict";

var _require = require('../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

function sourceNodes(_ref) {
  var actions = _ref.actions;
  var createTypes = actions.createTypes;
  var typeDefs = "\n\n    type Examples implements Node {\n      category: String\n      title: String\n      componentUrl: String\n      path: String\n      image: String\n    }\n\n    type HomeBullets implements Node {\n      text: String\n      desc: String\n      img: String\n    }\n\n    type AdditionalLinks implements Node {\n      name: String\n      href: String\n      index: Int\n    }\n\n    type PageDesc implements Node {\n      path: String\n      componentUrl: String\n      content: String\n    }\n\n    type Projects implements Node {\n      name: String\n      url: String\n    }\n\n    type Config implements Node {\n      PROJECT_NAME: String\n      PROJECT_TYPE: String\n      PROJECT_DESC: String\n\n      PROJECT_URL: String\n      WEBSITE_PATH: String\n      HOME_PATH: String\n\n      HEADER_LINK_URL: String\n\n      PROJECT_ORG_LOGO: String\n\n      PAGES: [PageDesc]\n\n      ROOT_FOLDER: String\n      DOC_FOLDER: String\n      DOC_FOLDERS: [String]\n      CODESANDBOX_FOLDER: String\n\n      GA_TRACKING_ID: String\n      GITHUB_KEY: String\n      ADDITIONAL_LINKS: [AdditionalLinks]\n      LINK_TO_GET_STARTED: String\n      PROJECTS: [Projects]\n      EXAMPLES: [Examples]\n      STYLESHEETS: [String]\n\n      siteUrl: String\n      pathPrefix: String\n      dateFromFormat: String\n    }\n\n    type SiteMetadata implements Node {\n      config: Config\n    }\n\n    type Site implements Node {\n      siteMetadata: SiteMetadata\n    }\n\n    type EntryFrontMatter implements Node {\n      title: String\n    }\n\n    type EntryFields implements Node {\n      slug: String\n    }\n\n    type EntryHeading implements Node {\n      value: String\n    }\n\n    type EntrychildMdx implements Node {\n      frontmatter: EntryFrontMatter\n      fields: EntryFields\n      headings: [EntryHeading]\n    }\n\n    type Entry implements Node {\n      childMdx: EntrychildMdx\n    }\n\n    type lvl2Chapter implements Node {\n      title: String\n      level: Int\n      entries: [Entry]\n    }\n\n    type lvl1Chapter implements Node {\n      title: String\n      level: Int\n      chapters: [lvl2Chapter]\n      entries: [Entry]\n    }\n\n    type docsJson implements Node {\n      chapters: [lvl1Chapter]\n      entries: [Entry]\n    }\n\n    type DocsJson implements Node {\n      chapters: [lvl1Chapter]\n      entries: [Entry]\n    }\n\n    type ImageSharp implements Node {\n      id: ID!\n    }\n    ";
  log.log({
    color: COLOR.YELLOW
  }, "Set up graphql schemas")();
  log.log({
    priority: 4,
    color: COLOR.YELLOW
  }, "Schemas:", typeDefs)();
  createTypes(typeDefs);
}

module.exports = sourceNodes;
//# sourceMappingURL=source-nodes.js.map