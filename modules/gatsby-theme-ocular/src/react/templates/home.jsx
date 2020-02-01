// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';

import WebsiteConfigConsumer from '../components/website-config';
import GithubContributors from '../components/github-contributors';

import Markdown from '../components/markdown';

import {
  Banner,
  Container,
  BannerContainer,
  Section,
  ProjectName,
  GetStartedLink,
  Footer,
  FooterText,
  FooterLogo
} from '../styled/home';

function renderPage({config, HeroExample, projectDesc}) {
  // Note: The Layout "wrapper" component adds header and footer etc
  return (
    <>
      <Banner>
        {HeroExample && (<HeroExample />)}
        <BannerContainer>
          <ProjectName>{config.PROJECT_NAME}</ProjectName>
          <p>{config.PROJECT_DESC}</p>
          <GetStartedLink to={config.LINK_TO_GET_STARTED}>
            GET STARTED
          </GetStartedLink>
        </BannerContainer>
      </Banner>
      {projectDesc && (
        <Section>
          <Container>
            <Markdown htmlAst={projectDesc.htmlAst} />
          </Container>
        </Section>
      )}
      {config.PROJECT_TYPE === 'github' && (
        <Section>
          <Container>
            <h3>Contributors</h3>
            <span>Join us!</span>
            <GithubContributors
              project={`${config.PROJECT_ORG}/${config.PROJECT_NAME}`}
            />
          </Container>
        </Section>
      )}
      <Footer>
        <Container>
          {config.PROJECT_ORG_LOGO && (
            <>
              <FooterText>Made by</FooterText>
              <FooterLogo src={`${config.PROJECT_ORG_LOGO}`} alt="logo" />
            </>
          )}
        </Container>
      </Footer>
    </>
  );
}

export default class IndexPage extends Component {
  render() {
    const {HeroExample, pageContext: {projectDesc}} = this.props;
    return (
      <main>
        <WebsiteConfigConsumer>
          {({config}) => renderPage({config, HeroExample, projectDesc})}
        </WebsiteConfigConsumer>
      </main>
    );
  }
}
