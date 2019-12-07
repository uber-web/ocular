const {log, COLOR} = require('../../utils/log');
/* eslint-disable no-param-reassign */
let tableOfContents = [];

function processEntry(chapter, entry, docNodes) {
  if (!entry.entry) {
    // TODO/ib - make probe's log.warn emit color
    // log.warn({color: COLOR.RED}, 'missing entry in chapter', chapter.title, entry)();
    log.log(
      {color: COLOR.RED},
      'missing entry in chapter',
      chapter.title,
      entry
    )();
    return;
  }
  const slug = entry.entry.replace(/\.[^/.]+$/, '').replace('/README', '');
  const docNode = docNodes[slug] || null;
  if (!docNode || !docNode.id) {
    // TODO/ib - make probe's log.warn emit color
    log.log(
      {priority: 4, color: COLOR.RED},
      `unmatched toc entry for "${slug}" ${chapter.title}`,
      docNode
    )();
  } else {
    entry.id = [docNode.id];
    entry.markdown = [docNode.id];
    // note - we don't need to have the entire docNode put in here.
    // the app will only use the fields/slug and frontmatter/title properties.
    entry.childMarkdownRemark = docNode;
    log.log(
      {color: COLOR.CYAN, priority: 2},
      'doc page',
      chapter.title,
      entry.entry
    )();
  }
}

function traverseTableOfContents(chapters, docNodes, level) {
  (chapters || []).forEach(chapter => {
    chapter.level = level;
    if (chapter.chapters) {
      traverseTableOfContents(chapter.chapters, docNodes, level + 1);
    }
    const entries = chapter.entries || [];
    (entries || []).forEach(entry => {
      processEntry(chapter, entry, docNodes);
    });
  });
}

// Patches up new markdown nodes
//
module.exports.processNewDocsJsonNode = function processNewDocsJsonNode(
  {node},
  docNodes
) {
  traverseTableOfContents(node.chapters, docNodes, 1);
  tableOfContents = node;

  log.log(
    {color: COLOR.CYAN, priority: 3},
    `Processing tableOfContents \
${Object.keys(docNodes).length}
${Object.keys(tableOfContents.chapters).length}
//${JSON.stringify(Object.keys(docNodes), null, 0)}
`
    // ${JSON.stringify(tableOfContents, null, 0)}
  )(); // , Object.keys(docNodes));
  return node;
};

// not used AFAIK
module.exports.getTableOfContents = function getTableOfContents() {
  log.log(
    'QUERIED tableOfContents',
    Object.keys(tableOfContents.chapters).length
  )();
  // , Object.keys(docNodes));
  return tableOfContents;
};
