const path = require('path');
const assert = require('assert');

const templatePath = path.resolve(__dirname, '../../react/templates');

// PATHS TO REACT PAGES
const INDEX_PAGE_URL = path.resolve(templatePath, 'home.jsx');

const DOC_MARKDOWN_PAGE_URL = path.resolve(
  templatePath,
  'documentation.jsx'
);

const EXAMPLE_GALLERY_PAGE_URL = path.resolve(
  templatePath,
  'examples.jsx'
);
const EXAMPLE_PAGE_URL = path.resolve(
  templatePath,
  'example-n.jsx'
);

const SEARCH_PAGE_URL = path.resolve(templatePath, 'search.jsx');

// All templates are overridable by top-level fields in ocular config
const PAGE_TEMPLATES = {
  INDEX_PAGE_URL,

  DOC_MARKDOWN_PAGE_URL,

  EXAMPLE_GALLERY_PAGE_URL,
  EXAMPLE_PAGE_URL,

  SEARCH_PAGE_URL
};

module.exports = function getPageTemplateUrl(templateName, ocularOptions) {
  assert(ocularOptions, 'Must pass ocularOptions to getPageTemplate');

  // Deprecated
  if (templateName === 'DOC_PAGE_URL') {
    templateName = 'DOC_MARKDOWN_PAGE_URL'; // eslint-disable-line
  }

  const templateUrl = PAGE_TEMPLATES[templateName];
  // If this is a valid template, look for an override in the config
  if (templateUrl) {
    const ocularTemplateUrl = ocularOptions && ocularOptions[templateName];
    if (ocularTemplateUrl) {
      return ocularTemplateUrl;
    }
  }
  assert(templateUrl);
  return templateUrl;
};
