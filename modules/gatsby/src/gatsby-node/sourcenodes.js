const { log, COLOR } = require('../utils/log');

const customTypes = ({actions}) => {
  const {createTypes} = actions;

  const typeDefs = `
    
    type Entry implements Node {
      id: [String]
      childMarkdownRemark: {
        id: String
        frontmatter: {
          title: String
        }
        fields: {
          slug: String
        }
      }
    }

    type lvl2Chapter implements Node {
      title: String
      level: int
      entries: [Entry]
    }

    type lvl1Chapter implements Node {
      title: String
      level: int
      chapters: [lvl2Chapter]
      entries: [Entry]
    }

    type DocsJson implements Node {
      chapters [lvl1Chapter]
      entries [Entry]
    }`;
 log.log(
      { color: COLOR.RED },
      `Created new typedefs`,
      typeDefs
    )();
  createTypes(typeDefs);
};

module.exports = customTypes;
