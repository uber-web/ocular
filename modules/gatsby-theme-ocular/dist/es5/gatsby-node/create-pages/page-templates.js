"use strict";

var path = require('path');

var templatePath = path.resolve(__dirname, '../../react/templates');
var INDEX_PAGE_URL = path.resolve(templatePath, 'home.jsx');
var DOC_MARKDOWN_PAGE_URL = path.resolve(templatePath, 'documentation.jsx');
var MARKDOWN_PAGE_URL = path.resolve(templatePath, 'page.jsx');
var EXAMPLE_GALLERY_PAGE_URL = path.resolve(templatePath, 'examples.jsx');
var SEARCH_PAGE_URL = path.resolve(templatePath, 'search.jsx');
module.exports = {
  INDEX_PAGE_URL: INDEX_PAGE_URL,
  MARKDOWN_PAGE_URL: MARKDOWN_PAGE_URL,
  DOC_MARKDOWN_PAGE_URL: DOC_MARKDOWN_PAGE_URL,
  EXAMPLE_GALLERY_PAGE_URL: EXAMPLE_GALLERY_PAGE_URL,
  SEARCH_PAGE_URL: SEARCH_PAGE_URL
};
//# sourceMappingURL=page-templates.js.map