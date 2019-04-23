const path = require('path');
const assert = require('assert');

// PATHS TO REACT PAGES
const INDEX_PAGE_URL = path.resolve(__dirname, '../../templates/index.jsx');

const DOC_PAGE_URL = path.resolve(__dirname, '../../templates/doc-n.jsx');

const EXAMPLE_GALLERY_PAGE_URL = path.resolve(__dirname, '../../templates/examples.jsx');
const EXAMPLE_PAGE_URL = path.resolve(__dirname, '../../templates/example-n.jsx');

const SEARCH_PAGE_URL = path.resolve(__dirname, '../../templates/search.jsx');

// All templates are overridable by top-level fields in ocular config
const PAGE_TEMPLATES = {
  INDEX_PAGE_URL,

  DOC_PAGE_URL,

  EXAMPLE_GALLERY_PAGE_URL,
  EXAMPLE_PAGE_URL,

  SEARCH_PAGE_URL
};

module.exports = function getPageTemplateUrl(templateName) {
  const templateUrl = PAGE_TEMPLATES[templateName];
  // If this is a valid template, look for an override in the config
  if (templateUrl) {
    const ocularTemplateUrl = global.ocularConfig && global.ocularConfig[templateName];
    if (ocularTemplateUrl) {
      return ocularTemplateUrl;
    }
  }
  assert(templateUrl);
  return templateUrl;
}