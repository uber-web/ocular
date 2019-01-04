import React, {Component} from 'react';
import {Link} from 'gatsby';
import WebsiteConfigConsumer from '../components/layout/website-config';
import {getReactComponent} from '../gatsby-config/component-registry';
import DefaultExampleRunner from './example-runner';

export default class Hero extends Component {

  getHeroExample() {
    // Get a hero example if provided, or the first of the listed examples
    const EXAMPLES = getReactComponent('EXAMPLES');
    const exampleNames = Object.keys(EXAMPLES);
    const DefaultHeroExample = exampleNames.length && EXAMPLES[0];
    if (DefaultHeroExample.title === 'none') {
      DefaultHeroExample = null;
    }

    let HeroExample = getReactComponent('HERO_EXAMPLE', DefaultHeroExample);
    if (!HeroExample) {
      console.warn('ocular: No hero example found', EXAMPLES);
    }
    return HeroExample;
  }

  renderPage({config}) {
    const HeroExample = this.getHeroExample();
    const ExampleRunner = getReactComponent('ExampleRunner', DefaultExampleRunner);

    return (
      <section className="banner">
        <div className="f hero">
          { HeroExample &&
            <ExampleRunner example={HeroExample.demo} sourceLink={HeroExample.path} noPanel />
          }
        </div>
        <div className="container">
          <h1>{config.PROJECT_NAME}</h1>
          <p>{config.PROJECT_DESC}</p>
          <Link to="/docs/get-started" className="btn">
            GET STARTED
          </Link>
        </div>
      </section>
    );
  }

  render() {
    return (
      <WebsiteConfigConsumer>
        {({ config }) => this.renderPage({config})}
      </WebsiteConfigConsumer>
    );
  }
}
