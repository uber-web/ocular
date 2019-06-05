// This is the top-level "Layout" component that doesn't get unmounted between
// page loads. This component is wrapped around the react component returned by
// each page using the gatsby browser/SSR `wrapPage` callback.

import React from 'react';
import {lightThemePrimitives, createTheme} from '../styled/theme';
import SiteQuery from '../site-query';
import TopLevelLayout from './top-level-layout';

// Note: gatsby-plugin-sass will process these files automatically when it sees this import
import '../../../styles/main.scss';

// The Layout instance is shared between pages. It queries common, static data
// and makes it available on React context
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.queryComplete = this.queryComplete.bind(this);
  }

  queryComplete(data) {
    const {children} = this.props;
    const {config} = data.site.siteMetadata;
    const {tableOfContents, allMarkdown} = data;

    // console.log('StaticQuery result', config, tableOfContents, allMarkdown);
    const themeFromConfig = ((config && config.THEME_OVERRIDES) || []).reduce(
      (prev, curr) => ({...prev, [curr.key]: curr.value}),
      {}
    );

    const theme = createTheme({...lightThemePrimitives, ...themeFromConfig});
    return (
      <TopLevelLayout
        {...this.props}
        config={config}
        tableOfContents={tableOfContents}
        allMarkdown={allMarkdown}
        theme={theme}
      >
        <div style={{position: 'relative', height: '100%'}}>{children}</div>
      </TopLevelLayout>
    );
  }

  render() {
    return <SiteQuery onComplete={this.queryComplete} />;
  }
}
