"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('../../utils/log'),
    log = _require.log,
    COLOR = _require.COLOR;

var MODULE_NAME = 'gatsby-theme-ocular';

function stringify(key, value) {
  if (value instanceof RegExp) {
    return value.toString();
  }

  if (value instanceof Function) {
    return '[function]';
  }

  switch (key) {
    case 'schemaString':
      if (log.priority < 5) {
        return '...logLevel<5...';
      }

      break;

    case 'options':
      if (log.priority < 4) {
        return '...logLevel<4...';
      }

      break;

    case 'use':
      if (log.priority < 3) {
        return '...logLevel<3...';
      }

      break;

    default:
  }

  return value;
}

function logWebpackConfig(stage, config) {
  if (log.priority >= 2) {
    log.log({
      color: COLOR.MAGENTA,
      priority: 3
    }, "STAGE ".concat(stage, ": webpack config: ").concat(JSON.stringify(config, stringify, 2)))();
  } else {
    log.log({
      color: COLOR.CYAN,
      priority: 1
    }, "STAGE ".concat(stage, ": Webpack started with aliases ").concat(JSON.stringify(config.WEBPACK_ALIAS || {}, stringify, 2)))();
  }
}

var WebpackRule = function () {
  function WebpackRule() {
    (0, _classCallCheck2.default)(this, WebpackRule);
  }

  (0, _createClass2.default)(WebpackRule, null, [{
    key: "isBabelLoader",
    value: function isBabelLoader(rule) {
      return rule.use && rule.use[0] && /babel-loader/.test(rule.use[0].loader);
    }
  }, {
    key: "getLoader",
    value: function getLoader(rule) {
      return rule.use && rule.use[0] && rule.use[0].loader;
    }
  }, {
    key: "checkIfExcludes",
    value: function checkIfExcludes(rule, path) {
      var exclude = rule.exclude;

      if (exclude && typeof exclude === 'function') {
        return exclude(path);
      }

      if (exclude && exclude instanceof RegExp) {
        return exclude.test(path);
      }

      return false;
    }
  }, {
    key: "checkIfIncludes",
    value: function checkIfIncludes(rule, path) {
      var exclude = rule.exclude;

      if (typeof exclude === 'function') {
        return !exclude(path);
      }

      if (exclude instanceof RegExp) {
        return !exclude.test(path);
      }

      return false;
    }
  }, {
    key: "updateRuleForOcular",
    value: function updateRuleForOcular(rule, ocularOptions) {
      var excludeNeedsReplace = WebpackRule.checkIfExcludes(rule, "node_modules/".concat(MODULE_NAME, "/"));

      if (excludeNeedsReplace) {
        rule.exclude = WebpackRule.getExcludeOverride(rule, ocularOptions);
        log.log({
          priority: 1,
          color: COLOR.RED
        }, "Replaced excludes for webpack rule ".concat(WebpackRule.getLoader(rule)))();
      }
    }
  }, {
    key: "getExcludeOverride",
    value: function getExcludeOverride(rule) {
      var ocularOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var exclude = rule.exclude;
      return function excludeOverride(path) {
        var isExcluded = typeof exclude === 'function' ? exclude(path) : exclude.test(path);

        if (isExcluded && /.*\.css$/.test(path)) {
          log.log(4, 'Prevented exclusion of css', path)();
          return false;
        }

        var ModuleRegEx = new RegExp(MODULE_NAME);

        if (isExcluded && ModuleRegEx.test(path)) {
          log.log(4, "Prevented exclusion of ocular gatsby ".concat(path))();
          return false;
        }

        if (isExcluded && /examples/.test(path)) {
          log.log(4, "Prevented exclusion of example ".concat(path))();
          return false;
        }

        var WEBPACK_EXCLUDE_REGEXP = ocularOptions.WEBPACK_EXCLUDE_REGEXP,
            WEBPACK_INCLUDE_REGEXP = ocularOptions.WEBPACK_INCLUDE_REGEXP;

        if (!isExcluded && WEBPACK_INCLUDE_REGEXP && WEBPACK_INCLUDE_REGEXP.test(path)) {
          log.log(3, 'Webpack loaders will include file', path)();
          return true;
        }

        if (!isExcluded && WEBPACK_EXCLUDE_REGEXP && WEBPACK_EXCLUDE_REGEXP.test(path)) {
          log.log(3, 'Enforced webpack will exclude file', path)();
          return true;
        }

        return isExcluded;
      };
    }
  }]);
  return WebpackRule;
}();

function getWebpackConfigOverrides(config, newConfig, ocularOptions) {
  var _iterator = _createForOfIteratorHelper(config.module.rules),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      WebpackRule.updateRuleForOcular(rule, ocularOptions);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  newConfig.node = newConfig.node || {};
  newConfig.node.fs = 'empty';
  newConfig.module = config.module || {};
  newConfig.module.rules = config.module.rules;
  var aliases = ocularOptions.WEBPACK_ALIAS || ocularOptions.webpack && ocularOptions.webpack.resolve && ocularOptions.webpack.resolve.alias;
  Object.assign(newConfig.resolve.alias, aliases);
  return newConfig;
}

function onCreateWebpackConfig(opts) {
  var ocularOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.ocularOptions;
  var stage = opts.stage,
      actions = opts.actions,
      getConfig = opts.getConfig;
  var config = getConfig();
  var newConfig = getWebpackConfigOverrides(config, config, ocularOptions);
  actions.replaceWebpackConfig(newConfig);
  logWebpackConfig(stage, newConfig);
}

module.exports = onCreateWebpackConfig;
module.exports.logWebpackConfig = logWebpackConfig;
module.exports.getWebpackConfigOverrides = getWebpackConfigOverrides;
//# sourceMappingURL=on-create-webpack-config.js.map