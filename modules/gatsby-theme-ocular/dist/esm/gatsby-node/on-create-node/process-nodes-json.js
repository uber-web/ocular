var path = require('path');

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var _require2 = require('../../utils/links-utils'),
    removeURLPathPrefix = _require2.removeURLPathPrefix;

var tableOfContents = null;

function processEntry(chapter, entry, docNodes, ocularOptions) {
  if (!entry.entry) {
    log.log({
      color: COLOR.RED
    }, 'missing entry in chapter', chapter.title, entry)();
    return;
  }

  var relPath = entry.entry.replace(/^\//, '').replace(/\.[^/.]+$/, '').replace(/\/$/, '').replace('/README', '');

  if (ocularOptions.HOME_PATH) {
    relPath = removeURLPathPrefix(relPath, ocularOptions.HOME_PATH);
  }

  var docNode = docNodes[relPath] || null;

  if (!docNode || !docNode.id) {
    log.log({
      priority: 4,
      color: COLOR.RED
    }, "unmatched toc entry for \"".concat(relPath, "\" ").concat(chapter.title), docNode)();
  } else {
    entry.id = [docNode.id];
    entry.markdown = [docNode.id];
    entry.childMdx = docNode;
    log.log({
      color: COLOR.CYAN,
      priority: 2
    }, 'doc page', chapter.title, entry.entry)();
  }
}

function traverseTableOfContents(chapters, docNodes, level, ocularOptions) {
  (chapters || []).forEach(function (chapter) {
    chapter.level = level;

    if (chapter.chapters) {
      traverseTableOfContents(chapter.chapters, docNodes, level + 1, ocularOptions);
    }

    var entries = chapter.entries || [];
    (entries || []).forEach(function (entry) {
      processEntry(chapter, entry, docNodes, ocularOptions);
    });
  });
}

module.exports.processNewDocsJsonNode = function processNewDocsJsonNode(_ref, ocularOptions, docNodes) {
  var node = _ref.node;
  traverseTableOfContents(node.chapters, docNodes, 1, ocularOptions);

  if (tableOfContents) {
    tableOfContents.chapters = tableOfContents.chapters.concat(node.chapters);
  } else {
    tableOfContents = node;
  }

  log.log({
    color: COLOR.CYAN,
    priority: 3
  }, "Processing tableOfContents ".concat(Object.keys(docNodes).length, "\n").concat(tableOfContents.length, "\n//").concat(JSON.stringify(Object.keys(docNodes), null, 0), "\n"))();
  return tableOfContents;
};
//# sourceMappingURL=process-nodes-json.js.map