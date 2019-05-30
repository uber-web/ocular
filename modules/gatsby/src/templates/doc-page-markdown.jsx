import React from 'react';
import rehypeReact from 'rehype-react';
import {graphql} from 'gatsby';

// note - these typographic elements are taken directly from baseui.
// we can consider customizing them by first importing in styled/index, then
// giving them special parameters

import {H1, H2, H3, H4, H5, H6, Paragraph1 as P} from 'baseui/typography';

const CustomLinkWrapper = relativeLinks => {
  const CustomLink = ({ href, ...props }) => {
    if (href.startsWith('http') || href.startsWith('#')) {
      // TODO - we could style them differently though
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...props} />;
    }
    const hrefWithoutLeadingSlash = href.startsWith('/') ? href.slice(1) : href;
    // eslint-disable-next-line jsx-a11y/anchor-has-content
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

export default class DocTemplate extends React.Component {
  constructor(props) {
    super(props);
    const {relativeLinks} = props.pageContext;
    // note - we can add many other custom components.
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
