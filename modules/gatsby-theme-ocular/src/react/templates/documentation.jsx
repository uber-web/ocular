import React from 'react';
import {graphql} from 'gatsby';

import Markdown from '../components/markdown';

import {MarkdownBody} from '../styled/typography';

// Query for the markdown doc by slug
// (Note: We could just search the allMarkdown from WebsiteConfig ourselves)
export const query = graphql`
  query DocBySlug($slug: String!) {
    docBySlug: markdownRemark(fields: {slug: {eq: $slug}}) {
      htmlAst
      timeToRead
      excerpt
      frontmatter {
        title
      }
    }
  }
`;

export default class DocTemplate extends React.Component {
  render() {
    const {htmlAst} = this.props.data.docBySlug;
    const {relativeLinks} = this.props.pageContext;
    return <MarkdownBody><Markdown relativeLinks={relativeLinks} htmlAst={htmlAst} /></MarkdownBody>;
  }
}
