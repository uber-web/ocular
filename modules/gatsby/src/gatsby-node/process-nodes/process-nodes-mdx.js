module.exports.processNewMDXNode = function processNewMDXNode(
  { node, actions, getNode },
  docNodes,
  tocNode
) {
  debugger
  console.log('MDX Node', JSON.stringify(node, null, 2));
/*
  const { createNodeField } = actions;

  const fileNode = getNode(node.parent);
  const parsedFilePath = path.parse(fileNode.relativePath);
  const hasTitle =
    Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
    Object.prototype.hasOwnProperty.call(node.frontmatter, 'title');

  let slug;
  if (hasTitle) {
    slug = `/${_.kebabCase(node.frontmatter.title)}`;
  } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === '') {
    slug = `/${parsedFilePath.name}/`;
  } else {
    slug = `/${parsedFilePath.dir}/`;
  }

  /*
  if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
      const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
      if (!date.isValid)
        console.warn(`WARNING: Invalid date.`, node.frontmatter);

      createNodeField({
        node,
        name: 'date',
        value: date.toISOString()
      });
    }
  }

  // createNodeField({ node, name: 'slug', value: slug });
  // postNodes.push(node);

  // Update path
  let relPath = node.fields.slug;
  if (node.fileAbsolutePath) {
    const index = node.fileAbsolutePath.indexOf('docs');
    if (index !== -1) {
      relPath = node.fileAbsolutePath.slice(index);
    }

    // relPath = path.relative(siteConfig.ROOT_FOLDER, node.fileAbsolutePath);
    const basename = path.basename(relPath, '.md');
    const dirname = path.dirname(relPath);
    relPath = basename === 'README' ? dirname : `${dirname}/${basename}`;

    createNodeField({ node, name: 'path', value: relPath });
    createNodeField({ node, name: 'slug', value: relPath });
    node.frontmatter.path = relPath;
  }
  if (tocNode) {
    // this means toc node has been created. Any markdown file processed beyond this point wouldn't have its info
    // in the toc.
    // but we can inject it afterwards

    // the regular toc node generation process adds the full content of each markdown node to the toc.
    // we don't need as much. The app will only use the title and slug of the corresponding markdown
    // node for each toc entry.

    const nodeToEdit = parseToc([tocNode], relPath);
    if (nodeToEdit) {
      nodeToEdit.childMarkdownRemark = {
        fields: {
          slug: relPath
        },
        frontmatter: {
          title: node.frontmatter.title
        },
      };
    }
    log.log({ color: COLOR.YELLOW }, `putting ${relPath} back in the TOC`)();
  } else {
    // while toc node isn't created, we can add the docs nodes to docNodes, which is used to add data to the TOC
    // once the toc node is created, there is no reason to keep doing that
    docNodes[relPath] = node;
  }
*/
};
