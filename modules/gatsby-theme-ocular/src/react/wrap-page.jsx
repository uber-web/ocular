// Effectively does the same job as `gatsby-layout-plugin`
// See https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout
//
// By wrapping pages this way the top-level layout component does not get unmounted
// between page changes

import React from 'react';
import SiteQuery from './site-query';
import TopLevelLayout from './templates/top-level-layout';

// This is the top-level "Layout" component that doesn't get unmounted between
// page loads. This component is wrapped around the react component returned by
// each page using the gatsby browser/SSR `wrapPage` callback.

// The Layout instance is shared between pages. It queries common, static data
// and makes it available on React context
export default function wrapPage({element, props}) {
  const onQueryComplete = data => {
    const {site: {siteMetadata: {config}}, tableOfContents, allMarkdown} = data;

    // console.log('StaticQuery result', config, tableOfContents, allMarkdown);

    return (
      <TopLevelLayout
        {...props}
        config={config}
        tableOfContents={tableOfContents}
        allMarkdown={allMarkdown}
      >
        {element}
      </TopLevelLayout>
    );
  };

  return <SiteQuery>{onQueryComplete}</SiteQuery>;
}
