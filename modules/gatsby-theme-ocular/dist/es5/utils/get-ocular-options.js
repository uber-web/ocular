"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require('./log'),
    log = _require.log;

var OCULAR_MODULE_NAME = 'gatsby-theme-ocular';

function getOcularOptions(config) {
  var _iterator = _createForOfIteratorHelper(config.plugins),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var plugin = _step.value;

      if (plugin === OCULAR_MODULE_NAME) {
        throw new Error("".concat(OCULAR_MODULE_NAME, " used without options in gatsby config"));
      }

      if (plugin && (0, _typeof2.default)(plugin) === 'object' && plugin.resolve === OCULAR_MODULE_NAME) {
        var options = plugin.options;

        if (!options) {
          throw new Error("".concat(OCULAR_MODULE_NAME, " used without options in gatsby config"));
        }

        return options;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  log.error(JSON.stringify(config && config.plugins, null, 2))();
  throw new Error("".concat(OCULAR_MODULE_NAME, " not found in gatsby config"));
}

module.exports.OCULAR_MODULE_NAME = OCULAR_MODULE_NAME;
module.exports.getOcularOptions = getOcularOptions;
//# sourceMappingURL=get-ocular-options.js.map