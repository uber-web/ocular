import React from 'react';
import rehypeReact from 'rehype-react';
import {graphql} from 'gatsby';

import {H1, H2, H3, H4, H5, H6, Paragraph1 as P} from 'baseui/typography';

const CustomLinkWrapper = relativeLinks => {
  const CustomLink = ({href, ...props}) => {
    if (href.startsWith('http') || href.startsWith('#')) {
      // TODO - we could style them differently though
      return <a {...props} />;
    }
    const hrefWithoutLeadingSlash = href.startsWith('/') ? href.slice(1) : href;
    return <a {...props} href={relativeLinks[hrefWithoutLeadingSlash]} />;
  };
  return CustomLink;
};

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
        cover
        category
        tags
      }
    }
  }
`;

// function replaceLinks(props) {
//   const { htmlAst } = props.data.docBySlug;
//   const { relativeLinks } = props.pageContext;
//   const renderAst = new rehypeReact({
//     createElement: React.createElement,
//     components: {
//       h1: CustomH1,
//       a: CustomLinkWrapper(relativeLinks)
//     },
//   }).Compiler

// const { html } = props.data.docBySlug;

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
    super(props);
    const {relativeLinks} = props.pageContext;
    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: P,
        a: CustomLinkWrapper(relativeLinks)
      }
    }).Compiler;
    this.state = {renderAst};
  }

  render() {
    const {htmlAst} = this.props.data.docBySlug;
    const {renderAst} = this.state;
    return (
      <div>
        <div className="markdown-body">{renderAst(htmlAst)}</div>
      </div>
    );
  }
}
