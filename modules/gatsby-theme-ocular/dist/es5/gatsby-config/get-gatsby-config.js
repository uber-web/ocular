"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var urljoin = require('url-join');

var _require = require('../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var validateConfig = require('../utils/validate-config');

var CONFIG_SCHEMA = require('./config-schema');

var defaults = {
  logLevel: 3,
  DOC_FOLDERS: [],
  CODESANDBOX_FOLDER: './',
  ROOT_FOLDER: './',
  SOURCE: 'website/src',
  EXAMPLES: [],
  DOCS: {},
  HEADER_LINK_URL: '/',
  LINK_TO_GET_STARTED: '/docs',
  PROJECT_TYPE: '',
  PROJECT_NAME: 'Ocular',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'http://localhost/',
  PROJECT_DESC: '',
  PAGES: [],
  PATH_PREFIX: '/',
  PROJECT_IMAGE: '',
  PROJECT_ORG_LOGO: '',
  PROJECTS: [],
  HOME_PATH: '',
  THEME_OVERRIDES: '',
  STYLESHEETS: [],
  ADDITIONAL_LINKS: [],
  GA_TRACKING_ID: null,
  GITHUB_KEY: null,
  webpack: {}
};

function getRemarkPlugins(paddedConfig) {
  var remarkPlugins = [{
    resolve: 'gatsby-remark-images',
    options: {
      maxWidth: 690
    }
  }, 'gatsby-remark-responsive-iframe', 'gatsby-remark-prismjs', 'gatsby-remark-copy-linked-files', {
    resolve: 'gatsby-remark-autolink-headers',
    options: {
      offsetY: 64,
      removeAccents: true,
      enableCustomId: true
    }
  }, {
    resolve: 'gatsby-remark-embedded-codesandbox',
    options: {
      directory: "".concat(paddedConfig.CODESANDBOX_FOLDER),
      protocol: 'embedded-codesandbox://',
      embedOptions: {
        codemirror: 1,
        fontsize: 12,
        hidenavigation: 1,
        view: 'split'
      },
      getIframe: function getIframe(url) {
        return "<iframe src=\"".concat(url, "\" style=\"width: 70vw; height: 70vh;\" class=\"embedded-codesandbox\" sandbox=\"allow-modals allow-forms allow-popups allow-scripts allow-same-origin\"></iframe>");
      }
    }
  }];
  return remarkPlugins;
}

module.exports = function getGatsbyConfig(config) {
  var _config$logLevel = config.logLevel,
      logLevel = _config$logLevel === void 0 ? 0 : _config$logLevel;
  log.priority = logLevel;
  log.log({
    color: COLOR.CYAN,
    priority: 0
  }, 'Loading gatsby config')();
  log.log({
    color: COLOR.CYAN,
    priority: 4
  }, "GATSBY CONFIG ".concat(JSON.stringify(config, null, 3)))();

  var paddedConfig = _objectSpread(_objectSpread({}, defaults), config);

  validateConfig(paddedConfig, CONFIG_SCHEMA);
  var remarkPlugins = getRemarkPlugins(paddedConfig);
  var gatsbyConfig = {
    pathPrefix: paddedConfig.PATH_PREFIX,
    siteMetadata: {
      config: paddedConfig,
      siteUrl: urljoin(paddedConfig.PROJECT_URL, paddedConfig.PATH_PREFIX)
    },
    plugins: ['gatsby-plugin-react-helmet', 'gatsby-plugin-styled-components', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp'].concat((0, _toConsumableArray2.default)(remarkPlugins), [{
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [".md", ".mdx"],
        gatsbyRemarkPlugins: remarkPlugins
      }
    }, 'gatsby-transformer-json'])
  };
  var docDirs = [paddedConfig.DOC_FOLDER].concat(paddedConfig.DOC_FOLDERS).filter(Boolean);

  if (docDirs.length > 0) {
    var _iterator = _createForOfIteratorHelper(docDirs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var path = _step.value;
        gatsbyConfig.plugins.push({
          resolve: 'gatsby-source-filesystem',
          options: {
            name: 'docs',
            path: path,
            ignore: ['**/src/**', '**/test/**', '**/dist/**', '**/package.json', '**/*.js']
          }
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    log.log({
      color: COLOR.YELLOW
    }, "DOC_FOLDERS not specified in gatsby-theme-ocular config}")();
  }

  if (paddedConfig.SOURCE) {
    var srcDirs = Array.isArray(paddedConfig.SOURCE) ? paddedConfig.SOURCE : [paddedConfig.SOURCE];

    var _iterator2 = _createForOfIteratorHelper(srcDirs),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _path = _step2.value;
        gatsbyConfig.plugins.push({
          resolve: 'gatsby-source-filesystem',
          options: {
            name: 'src',
            path: _path
          }
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } else {
    log.log({
      color: COLOR.YELLOW
    }, "SOURCE not found in gatsby-theme-ocular config}")();
  }

  if (paddedConfig.THEME_OVERRIDES) {
    paddedConfig.THEME_OVERRIDES = JSON.stringify(paddedConfig.THEME_OVERRIDES);
  }

  if (paddedConfig.EXAMPLES.length) {
    var _iterator3 = _createForOfIteratorHelper(paddedConfig.EXAMPLES),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var example = _step3.value;
        example.category = example.category || 'Examples';
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  log.log({
    color: COLOR.CYAN,
    priority: 2
  }, "GENERATED GATSBY CONFIG: ".concat(JSON.stringify(gatsbyConfig, null, 2)))();
  return gatsbyConfig;
};
//# sourceMappingURL=get-gatsby-config.js.map