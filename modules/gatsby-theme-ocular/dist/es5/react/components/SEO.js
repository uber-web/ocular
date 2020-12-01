"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SEO;

var _react = _interopRequireWildcard(require("react"));

var _reactHelmet = _interopRequireDefault(require("react-helmet"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function joinPath() {
  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  return parts.map(function (part) {
    return part && part.replace(/^\//, '').replace(/\/$/, '');
  }).filter(Boolean).join('/');
}

function SEO(_ref) {
  var config = _ref.config,
      path = _ref.path,
      pageContext = _ref.pageContext;
  (0, _react.useEffect)(function () {
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

  return _react.default.createElement(_reactHelmet.default, null, _react.default.createElement("meta", {
    name: "description",
    content: description
  }), _react.default.createElement("meta", {
    name: "image",
    content: image
  }), _react.default.createElement("script", {
    type: "application/ld+json"
  }, JSON.stringify(schemaOrgJSONLD)), _react.default.createElement("meta", {
    property: "og:url",
    content: isPost ? postURL : siteURL
  }), isPost ? _react.default.createElement("meta", {
    property: "og:type",
    content: "article"
  }) : null, _react.default.createElement("meta", {
    property: "og:title",
    content: title
  }), _react.default.createElement("meta", {
    property: "og:description",
    content: description
  }), _react.default.createElement("meta", {
    property: "og:image",
    content: image
  }), _react.default.createElement("meta", {
    property: "fb:app_id",
    content: config.siteFBAppID ? config.siteFBAppID : ''
  }), _react.default.createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), _react.default.createElement("meta", {
    name: "twitter:creator",
    content: config.userTwitter ? config.userTwitter : ''
  }), _react.default.createElement("meta", {
    name: "twitter:title",
    content: title
  }), _react.default.createElement("meta", {
    name: "twitter:description",
    content: description
  }), _react.default.createElement("meta", {
    name: "twitter:image",
    content: image
  }), config.GA_TRACKING_ID && _react.default.createElement("script", {
    async: true,
    src: "https://www.googletagmanager.com/gtag/js?id=".concat(config.GA_TRACKING_ID)
  }));
}
//# sourceMappingURL=SEO.js.map