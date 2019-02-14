import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import WebsiteConfigConsumer from '../components/layout/website-config';
import { getReactComponent, getHeroExample } from '../utils/component-registry';
import DefaultExampleRunner from './example-runner';

const colors = {
  black20: '#213746',
  white: '#fff'
};
const Banner = styled.section`
  height: 30rem;
  position: relative;
`;

const HeroContainer = styled.div`
  display: flex;
  height: 30rem;
`;

const TitleContainer = styled.div`
  background: ${props =>
    props.hasHeroExample ? 'transparent' : colors.black20};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  padding: 0 2rem;
  text-shadow: none;
  padding-left: 24px;
  width: 100%;
  height: 100%;
  color: {colors.white};
`;

const ProjectTitle = styled.h1`
  font-size: 5em;
  text-shadow: none;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
  margin: 96px 0 8px;
  padding: 96px 24px 8px;
`;

const ProjectTagLine = styled.div`
  text-shadow: none;
  padding: 12px 24px;
`;

function renderPage({
  config,
  ExampleRunner,
  HeroExample
}) {
  return (
    <Banner>
      <HeroContainer>
        {HeroExample && (
          <ExampleRunner
            example={HeroExample}
            sourceLink={HeroExample.path}
            noPanel
          />
        )}
      </HeroContainer>
      <TitleContainer hasHeroExample={Boolean(HeroExample)}>
        <ProjectTitle>{config.PROJECT_NAME}</ProjectTitle>
        <ProjectTagLine>{config.PROJECT_DESC}</ProjectTagLine>
        <Link to="/docs/get-started" className="btn">
          GET STARTED
        </Link>
      </TitleContainer>
    </Banner>
  );
}

export default class Hero extends Component {
  render() {
    return (
      <WebsiteConfigConsumer>
        {({ config }) => {
          const HeroExample = getHeroExample();
          const ExampleRunner = getReactComponent('ExampleRunner', DefaultExampleRunner);
          renderPage({ config, HeroExample, ExampleRunner})}
        }
      </WebsiteConfigConsumer>
    );
  }
}
