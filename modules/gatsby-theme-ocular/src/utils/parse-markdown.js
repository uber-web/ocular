const TITLE_REGEX = /^#+ ([^\n]*)/m;

module.exports.extractMarkdownTitle = function extractMarkdownTitle(markdown) {
  const matches = markdown.match(TITLE_REGEX);
  const title = matches && matches[1];
  return title;
}
