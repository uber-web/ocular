"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapPage;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _siteQuery = _interopRequireDefault(require("./site-query"));

var _topLevelLayout = _interopRequireDefault(require("./templates/top-level-layout"));

function wrapPage(_ref) {
  var element = _ref.element,
      props = _ref.props;

  var onQueryComplete = function onQueryComplete(data) {
    var config = data.site.siteMetadata.config,
        tableOfContents = data.tableOfContents;
    return _react.default.createElement(_topLevelLayout.default, (0, _extends2.default)({}, props, {
      config: config,
      tableOfContents: tableOfContents
    }), element);
  };

  return _react.default.createElement(_siteQuery.default, null, onQueryComplete);
}
//# sourceMappingURL=wrap-page.js.map