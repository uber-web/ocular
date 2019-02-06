// This is the top-level "Layout" component that doesn't get unmounted between
// page loads. This component is wrapped around the react component returned by
// each page by 'gatsby-plugin-layout'

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import { WebsiteConfigProvider } from './website-config';

import SEO from '../common/SEO';

import TableOfContents from './table-of-contents';
import ExampleTableOfContents from './example-table-of-contents';
import Header from './header';
// TODO/ib - restore footer
// import Footer from './footer';

const BodyGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 300px 1fr;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`;

const HeaderContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
  @media screen and (max-width: 600px) {
    order: 1;
  }
`;

const BodyContainerFull = styled.div`
  padding: ${props => props.theme.sitePadding};
  max-width: ${props => props.theme.contentWidthLaptop};
  margin: 0 auto;

  .contributors {
    max-width: 400px;
    margin: 100px auto 0;
  }
`;
const BodyContainerToC = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  max-width: ${props => (props.isExample ? null : '600px')};
  padding: 12px;
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }
  & p {
    margin-bottom: 1em;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`;

function ResponsiveHeader(props) {
  return (
    <div>
      <MediaQuery maxWidth={575}>
        <Header {...props} isSmallScreen />
      </MediaQuery>
      <MediaQuery minWidth={576}>
        <Header {...props} />
      </MediaQuery>
    </div>
  );
}

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  overflow: scroll;
  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`;

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  renderTOC(config, tableOfContents) {
    const { pageContext } = this.props;
    switch (pageContext.toc) {
      case 'docs':
        return (
          <TableOfContents
            chapters={tableOfContents.chapters}
            slug={pageContext.slug}
          />
        );

      case 'examples':
        const { EXAMPLES } = config;

        const examplesTOC = [
          {
            title: 'Examples',
            entries: []
          }
        ];

        for (const example of EXAMPLES) {
          // ignore empty list placeholder (makes graphql queryies not fail)
          if (example.title !== 'none') {
            const exampleEntry = Object.assign(
              {
                entry: example.title
              },
              example
            );
            examplesTOC[0].entries.push(exampleEntry);
          }
        }

        return (
          <ExampleTableOfContents
            chapters={examplesTOC}
            slug={pageContext.slug}
          />
        );

      default:
        console.warn(`Unknown toc type ${pageContext.toc}`);
        return null;
    }
  }

  renderBodyWithTOC(config, tableOfContents) {
    const { children, pathContext } = this.props;
    const { isMenuOpen } = this.state;
    const isExample = pathContext.toc === 'examples';
    return (
      <BodyGrid>
        <HeaderContainer>
          <ResponsiveHeader
            config={config}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
          />
        </HeaderContainer>

        <ToCContainer>{this.renderTOC(config, tableOfContents)}</ToCContainer>

        <BodyContainerToC isExample={isExample}>{children}</BodyContainerToC>

        {/* <Footer /> */}
      </BodyGrid>
    );
  }

  renderBodyFull(config) {
    const { children } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <div>
        <HeaderContainer>
          <ResponsiveHeader
            config={config}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
          />
        </HeaderContainer>

        <BodyContainerFull>{children}</BodyContainerFull>

        {/* <Footer /> */}
      </div>
    );
  }

  toggleMenu() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  render() {
    // Since gatsby's StaticQueries can't run in a plugin, we rely on the app website's
    // Layout wrapper component to query for us and pass in the data.
    const { pageContext, config, tableOfContents, allMarkdown } = this.props;
    return (
      <WebsiteConfigProvider value={{ config, tableOfContents, allMarkdown }}>
        <div>
          {allMarkdown ? (
            <SEO postEdges={allMarkdown} />
          ) : (
            <Helmet>
              <title>{config.PROJECT_NAME}</title>
            </Helmet>
          )}
          {pageContext.toc
            ? this.renderBodyWithTOC(config, tableOfContents)
            : this.renderBodyFull(config)}
        </div>
      </WebsiteConfigProvider>
    );
  }
}
