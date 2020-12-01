"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var PAGE_TEMPLATES = require('./page-templates');

function getExampleThumbnails(_ref) {
  var allFile = _ref.allFile,
      allImageSharp = _ref.allImageSharp;

  if (!allFile || !allFile.edges || !allFile.edges.length || !allImageSharp || !allImageSharp.edges || !allImageSharp.edges.length) {
    log.log({
      color: COLOR.YELLOW,
      priority: 1
    }, "No thumbnails created.")();
    return {};
  }

  var idLookup = allFile.edges.reduce(function (lookup, _ref2) {
    var node = _ref2.node;
    lookup[node.id] = node.relativePath;
    return lookup;
  }, {});
  var pathLookup = allImageSharp.edges.reduce(function (lookup, _ref3) {
    var node = _ref3.node;
    var originalImageId = node.parent.id;
    var originalImagePath = idLookup[originalImageId];
    lookup[originalImagePath] = node.resize.src;
    return lookup;
  }, {});
  return pathLookup;
}

function queryExamplesData(graphql) {
  return graphql("\n    {\n      site {\n        siteMetadata {\n          config {\n            EXAMPLES {\n              category\n              image\n              title\n              path\n              componentUrl\n            }\n          }\n        }\n      }\n      allImageSharp {\n        edges {\n          node {\n            parent {\n              id\n            }\n            resize(width: 400, height: 400, quality: 80) {\n              src\n            }\n          }\n        }\n      }\n      allFile {\n        edges {\n          node {\n            id\n            relativePath\n          }\n        }\n      }\n    }\n  ").then(function (result) {
    if (result.errors) {
      console.log(result.errors);
      throw new Error(result.errors);
    }

    var EXAMPLES = result.data.site.siteMetadata.config.EXAMPLES;
    var thumbnailsPublicUrls = getExampleThumbnails(result.data);
    var examplesWithImages = EXAMPLES.map(function (example) {
      return _objectSpread(_objectSpread({}, example), {}, {
        imageSrc: thumbnailsPublicUrls[example.image]
      });
    });
    return examplesWithImages;
  }).catch(function (error) {
    log.log({
      color: COLOR.BRIGHT_YELLOW
    }, "error in createPage query with images: ".concat(error))();
    return graphql("\n        {\n          site {\n            siteMetadata {\n              config {\n                EXAMPLES {\n                  title\n                  path\n                }\n              }\n            }\n          }\n        }\n      ").then(function (result) {
      if (result.errors) {
        console.log(result.errors);
        throw new Error(result.errors);
      }

      var EXAMPLES = result.data.site.siteMetadata.config.EXAMPLES;
      return EXAMPLES;
    });
  });
}

function createExampleGalleryPage(examples, examplesToc, createPage, ocularOptions) {
  if (examples.length === 0) {
    return;
  }

  log.log({
    color: COLOR.CYAN,
    priority: 1
  }, "Creating examples page")();
  log.log({
    color: COLOR.RED,
    priority: 4
  }, "with data ".concat(JSON.stringify(examples)))();
  var componentUrl = PAGE_TEMPLATES['EXAMPLE_GALLERY_PAGE_URL'];
  createPage({
    component: componentUrl,
    path: '/examples',
    context: {
      title: 'Examples',
      toc: examplesToc
    }
  });
}

function createIndividualExamplePages(examples, examplesToc, createPage, ocularOptions) {
  examples.forEach(function (example) {
    var exampleName = example.title;
    log.log({
      color: COLOR.CYAN,
      priority: 1
    }, "Creating example page ".concat(example.title, "}"))();
    var componentUrl = example.componentUrl;

    if (componentUrl) {
      createPage({
        path: example.path,
        component: componentUrl,
        context: {
          title: "".concat(example.title, " Example"),
          slug: example.path,
          toc: examplesToc,
          exampleConfig: example
        }
      });
    }
  });
}

function createExamplesToc(examples) {
  var examplesByCategory = {};

  var _iterator = _createForOfIteratorHelper(examples),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var example = _step.value;
      examplesByCategory[example.category] = examplesByCategory[example.category] || {
        title: example.category,
        entries: []
      };
      examplesByCategory[example.category].entries.push({
        title: example.title,
        path: example.path,
        image: example.imageSrc
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Object.values(examplesByCategory);
}

module.exports = function createExamplePages(_ref4, ocularOptions) {
  var graphql = _ref4.graphql,
      actions = _ref4.actions;
  var createPage = actions.createPage;
  return queryExamplesData(graphql).then(function (examples) {
    var examplesToc = createExamplesToc(examples);
    createExampleGalleryPage(examples, examplesToc, createPage, ocularOptions);
    createIndividualExamplePages(examples, examplesToc, createPage, ocularOptions);
  });
};
//# sourceMappingURL=create-example-pages.js.map