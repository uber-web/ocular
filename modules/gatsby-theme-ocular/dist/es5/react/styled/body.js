"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Body = exports.BodyContainerInner = exports.BodyContainerToC = exports.BodyContainerFull = exports.isMobile = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

var isMobile = function isMobile(props) {
  return "@media screen and (max-width: ".concat(props.theme.breakpoints.medium, "px)");
};

exports.isMobile = isMobile;

var BodyContainerFull = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 auto;\n  padding: ", " 0 0;\n  ", " {\n    padding: 0;\n    order: 2;\n  }\n"])), function (props) {
  return props.theme.sizing.scale1600;
}, isMobile);

exports.BodyContainerFull = BodyContainerFull;

var BodyContainerToC = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  height: 100%;\n  width: 100%;\n  padding: ", " 0 0 300px;\n  ", " {\n    height: calc(100vh - ", ");\n    padding: 0;\n    order: 2;\n  }\n"])), function (props) {
  return props.theme.sizing.scale1600;
}, isMobile, function (props) {
  return props.theme.sizing.scale1600;
});

exports.BodyContainerToC = BodyContainerToC;

var BodyContainerInner = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  height: 100%;\n  width: 100%;\n  position: relative;\n"])));

exports.BodyContainerInner = BodyContainerInner;

var Body = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  width: 100vw;\n  height: 100vh;\n"])), function (props) {
  return props.theme.typography.font300;
});

exports.Body = Body;
//# sourceMappingURL=body.js.map