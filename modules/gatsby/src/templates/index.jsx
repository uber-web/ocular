import React from 'react'
import WebsiteConfigConsumer from '../components/layout/website-config';
import DefaultHome from '../components/home';
import {getReactComponent} from '../utils/component-registry';

export default class IndexPage extends React.Component {
  renderPage({config}) {
    // Note: The Layout "wrapper" component adds header and footer etc

    const Home = getReactComponent('Home', DefaultHome);
    return (
      <main>
        <Home config={config} />
      </main>
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
