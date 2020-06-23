// This component contains the StaticQuery needed to provide data for the layout components.
// These layout components will then pass some of that information down to the rest of the site
// ie to the table of content, header, etc.

// because this is a StaticQuery it needs to be in the local tree so that its graphQl can be
// run by gatsby. Rather, a file of the same name must have the same query in the local tree.
// During the init process, ocular copies this file over to the local tree.

// WARNING: DO NOT MODIFY THIS FILE MANUALLY IT WILL BE OVERWRITTEN.
import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

// All common metadata, table-of-contents etc are queried here and put in React context
const QUERY = graphql`
  fragment SiteConfigFragment on Site {
    siteMetadata {
      config {
        PROJECT_NAME
        PROJECT_TYPE
        PROJECT_DESC
        PROJECT_URL
        PROJECT_ORG
        PROJECT_ORG_LOGO
        LINK_TO_GET_STARTED
        PATH_PREFIX
        EXAMPLES {
          title
          path
        }
        THEME_OVERRIDES
        STYLESHEETS
        PROJECTS {
          name
          url
        }
        ADDITIONAL_LINKS {
          name
          href
          index
        }
      }
    }
  }

  fragment MarkdownNodeFragment on Mdx {
    id
    fields {
      slug
    }
    frontmatter {
      title
    }
    headings(depth: h1) {
      value
    }
  }

  query ConfigQuery {
    site {
      ...SiteConfigFragment
    }

    allMarkdown: allMdx(limit: 2000) {
      edges {
        node {
          ...MarkdownNodeFragment
        }
      }
    }

    tableOfContents: docsJson {
      chapters {
        title
        level
        chapters {
          title
          level
          entries {
            childMdx {
              frontmatter {
                title
              }
              fields {
                slug
              }
              headings {
                value
              }
            }
          }
        }
        entries {
          childMdx {
            frontmatter {
              title
            }
            fields {
              slug
            }
            headings {
              value
            }
          }
        }
      }
    }
  }
`;

// The Layout instance is shared between pages. It queries common, static data
// and makes it available on React context
export default class SiteQuery extends React.Component {
  render() {
    const {children} = this.props;
    return <StaticQuery query={QUERY} render={children} />;
  }
}
