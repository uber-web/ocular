import React from 'react';

import { graphql } from 'gatsby';
import { AutoSizer } from 'react-virtualized';

import { ExampleTableOfContents, from '../components/layout/example-table-of-contents';
import { MainExample } from '../components/styled';
import WithConfig from '../components/layout/website-config';

/* eslint no-undef: "off" */
export const query = graphql`
  query ExampleBySlug($slug: String!) {
    exampleBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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

export default class ExampleTemplate extends React.Component {
  render() {
    const { pathContext, pageResources } = this.props;
    const { slug } = pathContext;

    // Get app website's example runner
    const DemoRunner = getReactComponent('ExampleRunner');
    const EXAMPLES = getReactComponent('EXAMPLES');

    const example = EXAMPLES[slug];
    if (!example) {
      console.warn(`No example found: ${slug}`);
    }
    // console.log(example);

    return (
      <WithConfig>
        {({ theme }) => (
          <MainExample theme={theme}>
            <AutoSizer>
              {({ height, width }) =>
                  example && (
                    <DemoRunner
                      height={height}
                      example={example}
                      sourceLink={
                        pageResources &&
                        pageResources.page &&
                        pageResources.page.path
                      }
                      width={width}
                    />
                  )
                }
            </AutoSizer>
          </MainExample>
          )}
      </WithConfig>
    );
  }
}
