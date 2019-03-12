// NOTE: Dummy component, just to get gatsby to compile the StaticQuery

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

// All common metadata, table-of-contents etc are queried here and put in React context
const QUERY = graphql`
  fragment SiteConfigFragment on Site {
    siteMetadata {
      config {
        PROJECT_NAME
        PROJECT_TYPE
        PROJECT_DESC
        HOME_HEADING
        HOME_BULLETS {
          text
          desc
          img
        }
        EXAMPLES {
          title
          path
        }
        THEME_OVERRIDES {
          key
          value
        }
      }
    }
  }

  fragment MarkdownNodeFragment on MarkdownRemark {
    id
    fields {
      slug
    }
    frontmatter {
      title
    }
  }

  query ConfigQuery {
    site {
      ...SiteConfigFragment
    }

    allMarkdown: allMarkdownRemark(limit: 2000) {
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
            id
            childMarkdownRemark {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
        entries {
          id
          childMarkdownRemark {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`;

// The Layout instance is shared between pages. It queries common, static data
// and makes it available on React context
export default class QueryLayer extends React.Component {
  render() {
    const { onComplete } = this.props;
    return <StaticQuery query={QUERY} render={onComplete} />;
  }
}
