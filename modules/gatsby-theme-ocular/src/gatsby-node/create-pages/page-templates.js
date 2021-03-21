const path = require('path');

const templatePath = path.resolve(__dirname, '../../react/templates');

// PATHS TO REACT PAGES
const INDEX_PAGE_URL = path.resolve(templatePath, 'home.jsx');

const DOC_MARKDOWN_PAGE_URL = path.resolve(templatePath, 'documentation.jsx');

const MARKDOWN_PAGE_URL = path.resolve(templatePath, 'page.jsx');

const EXAMPLE_GALLERY_PAGE_URL = path.resolve(templatePath, 'examples.jsx');

const SEARCH_PAGE_URL = path.resolve(templatePath, 'search.jsx');

// All templates are overridable by top-level fields in ocular config
module.exports = {
  INDEX_PAGE_URL,

  MARKDOWN_PAGE_URL,
  DOC_MARKDOWN_PAGE_URL,

  EXAMPLE_GALLERY_PAGE_URL,

  SEARCH_PAGE_URL
};
