import React, {Component} from 'react';
import {Link} from 'gatsby';
import WebsiteConfigConsumer from '../components/layout/website-config';
import {getReactComponent, getHeroExample} from '../utils/component-registry';
import DefaultExampleRunner from './example-runner';

export default class Hero extends Component {
  renderPage({config}) {
    const HeroExample = getHeroExample();
    const ExampleRunner = getReactComponent(
      'ExampleRunner',
      DefaultExampleRunner
    );

    return (
      <section className="banner">
        <div className="f hero">
          {HeroExample && (
            <ExampleRunner
              example={HeroExample}
              sourceLink={HeroExample.path}
              noPanel
            />
          )}
        </div>
        <div className="container">
          <h1>{config.PROJECT_NAME}</h1>
          <p>{config.PROJECT_DESC}</p>
          <Link to="/docs/" className="btn">
            GET STARTED
          </Link>
        </div>
      </section>
    );
  }

  render() {
    return (
      <WebsiteConfigConsumer>
        {({config}) => this.renderPage({config})}
      </WebsiteConfigConsumer>
    );
  }
}
