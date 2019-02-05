import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { AutoSizer } from "react-virtualized";

import ExampleTableOfContents from "../components/layout/example-table-of-contents";

import { getReactComponent } from "../utils/component-registry";

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

const Main = styled.main`
  height: calc(100vh - 96px);
  @media screen and (max-width: 600px) {
    margin-top: 64px;
  }
`;

export default class ExampleTemplate extends React.Component {
  render() {
    const { pathContext } = this.props;
    const { slug } = pathContext;

    // Get app website's example runner
    const DemoRunner = getReactComponent("ExampleRunner");
    const EXAMPLES = getReactComponent("EXAMPLES");

    const example = EXAMPLES[slug];
    if (!example) {
      console.warn(`No example found: ${slug}`);
    }

    // console.log(example);

    return (
      <Main>
        <AutoSizer>
          {({ height, width }) =>
            example && (
              <DemoRunner
                height={height}
                example={example}
                sourceLink={example.path}
                width={width}
              />
            )
          }
        </AutoSizer>
      </Main>
    );
  }
}
