"use strict";

var path = require('path');

var _ = require('lodash');

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var _require2 = require('../../utils/links-utils'),
    removeURLPathPrefix = _require2.removeURLPathPrefix;

function parseToc(queue, entry) {
  while (queue.length) {
    var n = queue.shift();

    if (n.entry === entry) {
      return n;
    }

    (n.chapters || []).forEach(function (c) {
      return queue.push(c);
    });
    (n.entries || []).forEach(function (e) {
      return queue.push(e);
    });
  }

  return null;
}

module.exports.processNewMarkdownNode = function processNewMarkdownNode(_ref, ocularOptions, docNodes, tocNode) {
  var node = _ref.node,
      actions = _ref.actions,
      getNode = _ref.getNode;
  var createNodeField = actions.createNodeField;
  var fileNode = getNode(node.parent);
  var parsedFilePath = path.parse(fileNode.relativePath);
  var title;

  if (node.frontmatter) {
    title = node.frontmatter.title;
  }

  var slug;

  if (title) {
    slug = "/".concat(_.kebabCase(title));
  } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    slug = "/".concat(parsedFilePath.dir, "/").concat(parsedFilePath.name, "/");
  } else if (parsedFilePath.dir === '') {
    slug = "/".concat(parsedFilePath.name, "/");
  } else {
    slug = "/".concat(parsedFilePath.dir, "/");
  }

  var relPath = path.relative(ocularOptions.ROOT_FOLDER, node.fileAbsolutePath);
  var basename = path.basename(relPath, '.md');
  basename = path.basename(basename, '.mdx');
  var dirname = path.dirname(relPath);
  relPath = basename === 'README' ? dirname : "".concat(dirname, "/").concat(basename);
  var tocNodePath = relPath;

  if (ocularOptions.HOME_PATH) {
    relPath = removeURLPathPrefix(relPath, ocularOptions.HOME_PATH);
  }

  createNodeField({
    node: node,
    name: 'path',
    value: relPath
  });
  createNodeField({
    node: node,
    name: 'slug',
    value: relPath
  });
  node.frontmatter.path = relPath;
  node.frontmatter.title = title || '';

  if (tocNode) {
    var nodeToEdit = parseToc([tocNode], tocNodePath);

    if (nodeToEdit) {
      nodeToEdit.childMdx = {
        fields: {
          slug: relPath
        },
        frontmatter: {
          title: node.frontmatter.title
        }
      };
    }

    log.log({
      priority: 4,
      color: COLOR.YELLOW
    }, "putting ".concat(relPath, " back in the TOC"))();
  }

  docNodes[relPath] = node;
};

module.exports.addSiblingNodes = function addSiblingNodes(createNodeField) {};

function addSourceInstanceName(_ref2, pluginOptions) {
  var node = _ref2.node,
      getNode = _ref2.getNode,
      loadNodeContent = _ref2.loadNodeContent,
      actions = _ref2.actions,
      createNodeId = _ref2.createNodeId,
      reporter = _ref2.reporter;
  var createNodeField = actions.createNodeField;
  var parent = getNode(node.parent);
  var sourceInstanceName = parent && parent.sourceInstanceName ? parent.sourceInstanceName : 'unknown';
  createNodeField({
    node: node,
    name: 'sourceName',
    value: sourceInstanceName
  });

  if (parent) {
    addMissingFrontmatter(node, sourceInstanceName);
  }
}

function addMissingFrontmatter(node, sourceInstanceName) {
  if (node.frontmatter) {
    if (node.rawBody) {
      var heading = node.rawBody.match(/^#+ (.*)$/m);
      node.frontmatter.title = heading ? heading[1] : '';
    }

    node.frontmatter.tags = ['default'];
    node.frontmatter.category = 'docs';
    node.frontmatter.cover = 'cover';
    node.frontmatter.type = sourceInstanceName;
  }
}

module.exports.cleanupMarkdownNode = function cleanupMarkdownNode(_ref3, pluginOptions) {
  var node = _ref3.node,
      getNode = _ref3.getNode,
      loadNodeContent = _ref3.loadNodeContent,
      actions = _ref3.actions,
      createNodeId = _ref3.createNodeId,
      reporter = _ref3.reporter;
  var processed = false;

  if (!processed) {
    switch (node.internal.mediaType) {
      case "text/markdown":
      case "text/x-markdown":
        addSourceInstanceName.apply(void 0, arguments);
        processed = true;
        break;

      default:
    }
  }

  if (!processed) {
    switch (node.internal.type) {
      case 'MarkdownRemark':
      case 'Markdown':
      case 'Mdx':
        addSourceInstanceName.apply(void 0, arguments);
        processed = true;
        break;

      default:
    }
  }
};
//# sourceMappingURL=process-nodes-markdown.js.map