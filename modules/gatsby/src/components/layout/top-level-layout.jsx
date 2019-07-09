// This is the top-level "Layout" component that doesn't get unmounted between
// page loads. This component is wrapped around the react component returned by
// each page by 'gatsby-plugin-layout'

import React from 'react';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import {BaseProvider, styled} from 'baseui';
import {WebsiteConfigProvider} from './website-config';

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

const HelloWorld = styled('div', {color: 'red'});

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

  toggleMenu() {
    const {isMenuOpen} = this.state;
    this.setState({isMenuOpen: !isMenuOpen});
  }

  renderBodyWithTOC(config, tableOfContents) {
    const {children, theme} = this.props;
    const {isMenuOpen} = this.state;
    // first div is to avoid the BodyGrid div className to be overwritten
    return (
      <div>
        <BodyGrid theme={theme}>
          <HeaderContainer theme={theme}>
            <ResponsiveHeader
              config={config}
              isMenuOpen={isMenuOpen}
              toggleMenu={this.toggleMenu}
            />
          </HeaderContainer>

          <ToCContainer theme={theme}>
            {this.renderTOC(config, tableOfContents)}
          </ToCContainer>

          <BodyContainerToC theme={theme}>{children}</BodyContainerToC>

          {/* <Footer /> */}
        </BodyGrid>
      </div>
    );
  }

  renderBodyFull(config) {
    const {children, theme} = this.props;
    const {isMenuOpen} = this.state;
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

  renderTOC(config, tableOfContents) {
    const {pageContext, theme} = this.props;
    switch (pageContext.toc) {
      case 'docs':
        return (
          <TableOfContents
            chapters={tableOfContents.chapters}
            slug={pageContext.slug}
            theme={theme}
          />
        );

      case 'examples': {
        const {EXAMPLES} = config;

        const examplesTOC = [
          {
            title: 'Examples',
            entries: []
          }
        ];

        // eslint-disable-next-line
        for (const example of EXAMPLES) {
          const exampleEntry = Object.assign(
            {
              entry: example.title
            },
            example
          );
          examplesTOC[0].entries.push(exampleEntry);
        }

        return (
          <ExampleTableOfContents
            chapters={examplesTOC}
            slug={pageContext.slug}
          />
        );
      }

      default:
        console.warn(`Unknown toc type ${pageContext.toc}`); // eslint-disable-line
        return null;
    }
  }

  render() {
    // Since gatsby's StaticQueries can't run in a plugin, we rely on the app website's
    // Layout wrapper component to query for us and pass in the data.
    const {
      pageContext,
      config,
      theme,
      tableOfContents,
      allMarkdown
    } = this.props;

    return (
      <WebsiteConfigProvider
        value={{config, theme, tableOfContents, allMarkdown}}
      >
        <BaseProvider theme={theme}>
          <div>
            <HelloWorld>Hello Styletron</HelloWorld>
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
        </BaseProvider>
      </WebsiteConfigProvider>
    );
  }
}
