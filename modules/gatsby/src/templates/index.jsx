import React from 'react';
import WebsiteConfigConsumer from '../components/layout/website-config';
import Home from '../components/home';

export default class IndexPage extends React.Component {
  render() {
    return (
      <WebsiteConfigConsumer>
        {({config}) => (
          <main>
            <Home config={config} />
          </main>
        )}
      </WebsiteConfigConsumer>
    );
  }
}
