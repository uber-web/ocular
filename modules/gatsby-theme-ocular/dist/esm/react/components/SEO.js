import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

function joinPath() {
  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  return parts.map(function (part) {
    return part && part.replace(/^\//, '').replace(/\/$/, '');
  }).filter(Boolean).join('/');
}

export default function SEO(_ref) {
  var config = _ref.config,
      path = _ref.path,
      pageContext = _ref.pageContext;
  useEffect(function () {
    if (!config.GA_TRACKING_ID) {
      return;
    }

    if (typeof window !== 'undefined') {
      var gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.dataLayer = window.dataLayer || [];
      gtag('js', new Date());
      gtag('config', config.GA_TRACKING_ID);
    }
  }, [config.GA_TRACKING_ID]);
  var title = pageContext.title,
      description = pageContext.description;
  var isPost = Boolean(title);
  var siteURL = joinPath(config.PROJECT_URL, config.pathPrefix);
  var image = joinPath(siteURL, config.PROJECT_IMAGE || config.PROJECT_ORG_LOGO);
  var postURL = joinPath(siteURL, path);
  title = title ? "".concat(config.PROJECT_NAME, " | ").concat(title) : config.PROJECT_NAME;
  description = description || config.PROJECT_DESC;
  var schemaOrgJSONLD = [{
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url: siteURL,
    name: config.PROJECT_NAME
  }];

  if (isPost) {
    schemaOrgJSONLD.push([{
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': postURL,
          name: title,
          image: image
        }
      }]
    }, {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      url: siteURL,
      name: title,
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: image
      },
      description: description
    }]);
  }

  return React.createElement(Helmet, null, React.createElement("meta", {
    name: "description",
    content: description
  }), React.createElement("meta", {
    name: "image",
    content: image
  }), React.createElement("script", {
    type: "application/ld+json"
  }, JSON.stringify(schemaOrgJSONLD)), React.createElement("meta", {
    property: "og:url",
    content: isPost ? postURL : siteURL
  }), isPost ? React.createElement("meta", {
    property: "og:type",
    content: "article"
  }) : null, React.createElement("meta", {
    property: "og:title",
    content: title
  }), React.createElement("meta", {
    property: "og:description",
    content: description
  }), React.createElement("meta", {
    property: "og:image",
    content: image
  }), React.createElement("meta", {
    property: "fb:app_id",
    content: config.siteFBAppID ? config.siteFBAppID : ''
  }), React.createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), React.createElement("meta", {
    name: "twitter:creator",
    content: config.userTwitter ? config.userTwitter : ''
  }), React.createElement("meta", {
    name: "twitter:title",
    content: title
  }), React.createElement("meta", {
    name: "twitter:description",
    content: description
  }), React.createElement("meta", {
    name: "twitter:image",
    content: image
  }), config.GA_TRACKING_ID && React.createElement("script", {
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=".concat(config.GA_TRACKING_ID)
  }));
}
//# sourceMappingURL=SEO.js.map