import React from 'react';
import { graphql } from 'gatsby';
// import { MDXRenderer } from 'gatsby-mdx';

// Query for the markdown doc by slug
// (Note: We could just search the allMarkdown from WebsiteConfig ourselves)
export const query = graphql`
  query mdxDocById($id: String) {
    mdx(id: { eq: $id }) {
      code {
        body
      }
    }
  }
`;

// function replaceLinks(props) {
//   const { body } = props.data.mdx.code;
//   const { code, relativeLinks } = props.pageContext;

//   return html.replace(/href="([^"]+)"/g, (link, href) => {
//     // don't rewrite external links, don't rewrite links to anchors
//     if (href.startsWith('http') || href.startsWith('#')) {
//       // TODO - we could style them differently though
//       return link;
//     }
//     const hrefWithoutLeadingSlash = href.startsWith('/') ? href.slice(1) : href;
//     // replace links to:
//     // - known physical files, either relative to this file or relative to root
//     // - known routes, either relative to the route of this page or to the home page
//     // by a link to their corresponding route, expresed relative to the home page
//     return `href="${relativeLinks[hrefWithoutLeadingSlash]}"`;
//   });
// }

export default class DocTemplate extends React.Component {
  constructor(props) {
    debugger
    super(props);
    this.state = { html: 'works' };
    console.error('markdown rendering with props', JSON.stringify(this.props, null, 2));
  }

  render() {
    const { html } = this.state;
    return (
      <div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
}
