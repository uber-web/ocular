import React, {Component} from 'react';
import Helmet from 'react-helmet';

function joinPath(...parts) {
  return parts.map(part => part && part.replace(/^\//, '').replace(/\/$/, '')).filter(Boolean).join('/');
}

// TODO/ib - modify this component to work with ocular content
class SEO extends Component {
  render() {
    const {config, path} = this.props;
    let {pageContext: {title, description}} = this.props;

    const isPost = Boolean(title);
    const siteURL = joinPath(config.PROJECT_URL, config.pathPrefix);
    const image = joinPath(siteURL, config.PROJECT_IMAGE || config.PROJECT_ORG_LOGO);
    const postURL = joinPath(siteURL, path);
    title = title || config.PROJECT_NAME;
    description = description || config.PROJECT_DESC;

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: siteURL,
        name: config.PROJECT_NAME
      }
    ];
    if (isPost) {
      schemaOrgJSONLD.push([
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': postURL,
                name: title,
                image
              }
            }
          ]
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: siteURL,
          name: title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image
          },
          description
        }
      ]);
    }
    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={isPost ? postURL : siteURL} />
        {isPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ''}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
