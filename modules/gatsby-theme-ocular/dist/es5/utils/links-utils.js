"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var path = require('path');

var _require = require('./log'),
    log = _require.log,
    COLOR = _require.COLOR;

var parseLinks = function parseLinks(href, source, relativeLinks, config) {
  if (href.startsWith('http') || href.startsWith('#')) {
    return null;
  }

  var relPath = href.replace(/#.*/, '');

  if (config.HOME_PATH) {
    relPath = removeURLPathPrefix(relPath, config.HOME_PATH);
  } else {
    relPath = linkFromFileToFile(source, relPath);
  }

  var anchor = href.match(/#.*/);
  var relativeLink = relativeLinks[relPath];

  if (relativeLink) {
    return anchor ? relativeLink + anchor[0] : relativeLink;
  }

  return null;
};

function linkFromFileToFile(sourceFile, targetFile) {
  var relativePathFromDirToDir = path.relative(sourceFile, path.dirname(targetFile));
  var fileName = path.basename(targetFile, '.md');

  if (fileName === 'README') {
    return relativePathFromDirToDir;
  }

  return path.join(relativePathFromDirToDir, fileName);
}

function addToRelativeLinks(_ref) {
  var _objectSpread2;

  var source = _ref.source,
      target = _ref.target,
      rootFolder = _ref.rootFolder,
      edge = _ref.edge,
      relativeLinks = _ref.relativeLinks;

  if (!source || !target) {
    log.log({
      color: COLOR.YELLOW
    }, "couldn't add relative link for: ".concat(JSON.stringify({
      source: source,
      target: target
    })))();
    return {};
  }

  var relativeToRootFolder = rootFolder && linkFromFileToFile(rootFolder, source);
  var relativeToCurrentSlug = linkFromFileToFile(edge.node.fields.path, target);
  var absoluteTarget = "/".concat(target);
  return _objectSpread(_objectSpread({}, relativeLinks), {}, (_objectSpread2 = {}, (0, _defineProperty2.default)(_objectSpread2, relativeToRootFolder, absoluteTarget), (0, _defineProperty2.default)(_objectSpread2, relativeToCurrentSlug, absoluteTarget), (0, _defineProperty2.default)(_objectSpread2, target, absoluteTarget), _objectSpread2));
}

function removeURLPathPrefix(relPath, pathToRemove) {
  var result = relPath;

  if (relPath.includes("/".concat(pathToRemove, "/"))) {
    result = relPath.replace("/".concat(pathToRemove, "/"), '/');
  } else if (relPath.includes("".concat(pathToRemove, "/"))) {
    result = relPath.replace("".concat(pathToRemove, "/"), '');
  } else if (relPath.includes(pathToRemove)) {
    result = relPath.replace(pathToRemove, '/');
  }

  return result;
}

function isInternalURL(to) {
  try {
    var url = new URL(to, window.location.origin);
    return url.hostname === window.location.hostname;
  } catch (_unused) {
    return false;
  }
}

module.exports.addToRelativeLinks = addToRelativeLinks;
module.exports.parseLinks = parseLinks;
module.exports.isInternalURL = isInternalURL;
module.exports.removeURLPathPrefix = removeURLPathPrefix;
//# sourceMappingURL=links-utils.js.map