// This is the top-level "Layout" component that doesn't get unmounted between
// page loads. This component is wrapped around the react component returned by
// each page by 'gatsby-plugin-layout'

import React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import theme from '../styled/theme';

import { WebsiteConfigProvider } from './website-config';

import SEO from '../common/SEO';

import TableOfContents from './table-of-contents';
import ExampleTableOfContents from './example-table-of-contents';
import Header from './header';

import {
  ToCContainer,
  BodyGrid,
  HeaderContainer,
  BodyContainerFull,
  BodyContainerToC
} from '../styled';

// TODO/ib - restore footer
// import Footer from './footer';

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

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  renderBodyWithTOC(config, tableOfContents) {
    const { children, pathContext } = this.props;
    const { isMenuOpen } = this.state;
    const isExample = pathContext.toc === 'examples';
    return (
      <BodyGrid theme={theme}>
        <HeaderContainer theme={theme}>
          <ResponsiveHeader
            config={config}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
          />
        </HeaderContainer>

        <ToCContainer theme={theme}>{this.renderTOC(config, tableOfContents)}</ToCContainer>

        <BodyContainerToC isExample={isExample} theme={theme}>{children}</BodyContainerToC>

        {/* <Footer /> */}
      </BodyGrid>
    );
  }

  renderBodyFull(config) {
    const { children } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <div>
        <HeaderContainer theme={theme}>
          <ResponsiveHeader
            config={config}
            isMenuOpen={isMenuOpen}
            theme={theme}
            toggleMenu={this.toggleMenu}
          />
        </HeaderContainer>

        <BodyContainerFull theme={theme}>{children}</BodyContainerFull>

        {/* <Footer /> */}
      </div>
    );
  }

  toggleMenu() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  renderTOC(config, tableOfContents) {
    const { pageContext } = this.props;
    switch (pageContext.toc) {
      case 'docs':
        return (
          <TableOfContents
            chapters={tableOfContents.chapters}
            slug={pageContext.slug}
            theme={theme}
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

  render() {
    // Since gatsby's StaticQueries can't run in a plugin, we rely on the app website's
    // Layout wrapper component to query for us and pass in the data.
    const { pageContext, config, theme, tableOfContents, allMarkdown } = this.props;
    console.log(theme);
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
