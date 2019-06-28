import React, {Component} from 'react';
import {Link} from 'gatsby';
import WebsiteConfigConsumer from './layout/website-config';

export default class Hero extends Component {
  renderPage({config}) {
    const {HeroExample} = this.props;
    const linkToGetStarted = config.LINK_TO_GET_STARTED || '/docs/developer-guide/get-started';

    return (
      <section className="banner">
        <div className="f hero">
          {HeroExample && (<HeroExample />)}
        </div>
        <div className="container">
          <h1>{config.PROJECT_NAME}</h1>
          <p>{config.PROJECT_DESC}</p>
          <Link to={linkToGetStarted} className="btn">
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
