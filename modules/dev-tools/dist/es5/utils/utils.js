"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function shallowMerge(base, override) {
  for (var key in override) {
    if (base[key] && (0, _typeof2.default)(base[key]) === 'object') {
      Object.assign(base[key], override[key]);
    } else {
      base[key] = override[key];
    }
  }

  return base;
}

module.exports = {
  shallowMerge: shallowMerge
};
//# sourceMappingURL=utils.js.map