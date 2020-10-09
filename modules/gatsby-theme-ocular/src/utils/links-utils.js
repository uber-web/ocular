const path = require('path');
const {log, COLOR} = require('./log');

const parseLinks = (href, source, relativeLinks) => {
  // external link
  if (href.startsWith('http') || href.startsWith('#')) {
    return null;
  }

  const relPath = linkFromFileToFile(source, href.replace(/#.*/, ''));
  const anchor = href.match(/#.*/);
  // relative link ie doc to doc
  const relativeLink = relativeLinks[relPath];
  if (relativeLink) {
    return anchor ? relativeLink + anchor[0] : relativeLink;
  }

  return null;
};
// if using simply path.relative(from, to) to files which are in the same folder, the resolved path is: '../to'.
// instead we do relative path between folders, then add the name of the target file in the end.
// in that same scenario, the relative path between folders will be '', and overall path just 'to'.

function linkFromFileToFile(sourceFile, targetFile) {
  const relativePathFromDirToDir = path.relative(
    sourceFile,
    path.dirname(targetFile)
  );
  return path.join(relativePathFromDirToDir, path.basename(targetFile, '.md'));
}

function addToRelativeLinks({source, target, rootFolder, edge, relativeLinks}) {
  // what we are doing here: for each markdown file, we create a mapping of different ways to
  // link to another markdown file that we will honor.

  // let's suppose that we want to go from a file:
  // - physical location: /docs/my-files/source.md, slug: /docs/chapter-1/source
  // to this file:
  // - phyiscal location: /docs/developer-guide/target.md, slug: /docs/advanced-usage/api-reference/target

  // by default, '../../advanced-usage/api/reference/target' would work (target file slug, relative to original slug)
  // '/docs/advanced-usage/api-reference/target' would also work (absolute target slug)
  // however, on github, those links wouldn't work as there is no phyiscal file behind that link.
  // in github however: '/docs/developer-guide/target.md' (file name relative to root) or
  // '../developer-guide/target.md' (relative file name) would work. Those links wouldn't work on the gatsby rendered
  // page however (until that).

  // we are creating a mapping so that ANY OF THESE 4 SYNTAXES would be honored.
  // So, authors can use links that refer to physical files, and gatsby will render a link that works - the same link
  // can work on github and gatsby

  // note that often, the physical location and the slug are the same!
  // However there is no guarantee that this will be the case.

  if (!source || !target) {
    log.log(
      {color: COLOR.YELLOW},
      `couldn't add relative link for: ${JSON.stringify({source, target})}`
    )();
    return {};
  }
  const relativeToRootFolder =
    rootFolder && linkFromFileToFile(rootFolder, source);
  const relativeToCurrentSlug = linkFromFileToFile(
    edge.node.fields.path,
    target
  );

  const absoluteTarget = `/${target}`;

  return {
    ...relativeLinks,
    [relativeToRootFolder]: absoluteTarget,
    [relativeToCurrentSlug]: absoluteTarget,
    [target]: absoluteTarget
  };
}

function isInternalURL(to) {
  try {
    const url = new URL(to, window.location.origin);
    return url.hostname === window.location.hostname;
  } catch {
    return false;
  }
}

module.exports.addToRelativeLinks = addToRelativeLinks;
module.exports.parseLinks = parseLinks;
module.exports.isInternalURL = isInternalURL;
