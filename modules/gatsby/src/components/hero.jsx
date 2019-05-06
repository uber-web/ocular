import React, {Component} from 'react';
import {Link} from 'gatsby';
import {getHeroExample} from '../utils/example-registry';
import WebsiteConfigConsumer from './layout/website-config';
import ExampleRunner from './example-runner';

export default class Hero extends Component {
  renderPage({config}) {
    const HeroExample = getHeroExample();

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
        {({config}) => this.renderPage({config})}
      </WebsiteConfigConsumer>
    );
  }
}
