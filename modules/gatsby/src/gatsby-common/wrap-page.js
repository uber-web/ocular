// TODO: fix lint errors in this file
/* eslint-disable */
// Effectively does the same job as `gatsby-layout-plugin`
// See https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-layout
//
// By wrapping pages this way the top-level layout component does not get unmounted
// between page changes

const React = require(`react`);

const Layout = require('../components/layout/layout').default;

// eslint-disable-next-line react/prop-types, react/display-name
module.exports = ({element, props}) => {
  console.log('in wrap page', props);
  return <Layout {...props}>{element}</Layout>;
};

/* eslint-enable */
