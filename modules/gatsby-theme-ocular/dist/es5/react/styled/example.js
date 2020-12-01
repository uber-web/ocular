"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceLink = exports.PanelContent = exports.PanelTitle = exports.PanelExpander = exports.PanelContainer = exports.ExampleTitle = exports.ExampleCard = exports.ExamplesGroup = exports.MainExamples = exports.ExampleHeader = exports.MainExample = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gatsby = require("gatsby");

var _body = require("./body");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;

var MainExample = _styledComponents.default.main(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 100%;\n  position: relative;\n"])));

exports.MainExample = MainExample;

var ExampleHeader = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  color: ", ";\n  margin: 0 ", ";\n  border-bottom: 1px solid ", ";\n  display: inline-block;\n  padding: ", " ", "\n    ", " 0;\n"])), function (props) {
  return props.theme.typography.font500;
}, function (props) {
  return props.theme.colors.mono800;
}, function (props) {
  return props.theme.sizing.scale700;
}, function (props) {
  return props.theme.colors.mono500;
}, function (props) {
  return props.theme.sizing.scale700;
}, function (props) {
  return props.theme.sizing.scale700;
}, function (props) {
  return props.theme.sizing.scale100;
});

exports.ExampleHeader = ExampleHeader;

var MainExamples = _styledComponents.default.main(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  padding: ", " 0;\n"])), function (props) {
  return props.theme.sizing.scale600;
});

exports.MainExamples = MainExamples;

var ExamplesGroup = _styledComponents.default.main(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-wrap: wrap;\n  padding: ", ";\n"])), function (props) {
  return props.theme.sizing.scale600;
});

exports.ExamplesGroup = ExamplesGroup;
var ExampleCard = (0, _styledComponents.default)(_gatsby.Link)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  cursor: pointer;\n  text-decoration: none;\n  width: 50%;\n  max-width: 240px;\n  line-height: 0;\n  outline: none;\n  padding: ", ";\n  position: relative;\n  img {\n    transition-property: filter;\n    transition-duration: ", ";\n    transition-timing-function: ", ";\n  }\n  &:hover {\n    box-shadow: ", ";\n  }\n  &:hover img {\n    filter: contrast(0.2);\n  }\n  ", " {\n    width: 33%;\n    min-width: 200px;\n  }\n  @media screen and (max-width: 632px) {\n    width: 50%;\n  }\n"])), function (props) {
  return props.theme.sizing.scale100;
}, function (props) {
  return props.theme.animation.timing400;
}, function (props) {
  return props.theme.animation.easeInOutCurve;
}, function (props) {
  return props.theme.lighting.shadow600;
}, _body.isMobile);
exports.ExampleCard = ExampleCard;

var ExampleTitle = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  color: ", ";\n  font: ", ";\n  font-size: 1.5em;\n  text-align: center;\n  width: 90%;\n  height: 90%;\n  top: 5%;\n  left: 5%;\n  border: solid 1px ", ";\n  opacity: 0;\n  transition-property: opacity;\n  transition-duration: ", ";\n  transition-timing-function: ", ";\n  &:hover {\n    opacity: 1;\n  }\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.typography.font300;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.animation.timing400;
}, function (props) {
  return props.theme.animation.easeInOutCurve;
});

exports.ExampleTitle = ExampleTitle;

var PanelContainer = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 344px;\n  background: ", ";\n  box-shadow: ", ";\n  margin: ", ";\n  padding: ", " ", ";\n  max-height: 96%;\n  overflow-x: hidden;\n  overflow-y: auto;\n  overflow-y: overlay;\n  outline: none;\n  z-index: 1;\n\n  ", " {\n    width: auto;\n    left: 0;\n  }\n"])), function (props) {
  return props.theme.typography.font300;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.lighting.shadow400;
}, function (props) {
  return props.theme.sizing.scale800;
}, function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale800;
}, _body.isMobile);

exports.PanelContainer = PanelContainer;

var PanelExpander = _styledComponents.default.div(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  display: none;\n  width: ", ";\n  height: ", ";\n  font-family: serif;\n  font-size: 0.8em;\n  text-align: center;\n  line-height: ", ";\n  border-radius: 50%;\n  background: ", ";\n  color: ", ";\n  ", " {\n    display: block;\n  }\n"])), function (props) {
  return props.theme.sizing.scale600;
}, function (props) {
  return props.theme.sizing.scale600;
}, function (props) {
  return props.theme.sizing.scale600;
}, function (props) {
  return props.$expanded ? 'none' : props.theme.colors.mono900;
}, function (props) {
  return props.$expanded ? props.theme.colors.mono1000 : props.theme.colors.mono100;
}, _body.isMobile);

exports.PanelExpander = PanelExpander;

var PanelTitle = _styledComponents.default.div(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font: ", ";\n  margin: ", " 0;\n  ", " {\n    cursor: pointer;\n  }\n"])), function (props) {
  return props.theme.typography.font450;
}, function (props) {
  return props.theme.sizing.scale300;
}, _body.isMobile);

exports.PanelTitle = PanelTitle;

var PanelContent = _styledComponents.default.div(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  div > * {\n    vertical-align: middle;\n    white-space: nowrap;\n  }\n  div > label {\n    display: inline-block;\n    width: 40%;\n    margin-right: 10%;\n    color: ", ";\n    margin-top: 2px;\n    margin-bottom: 2px;\n  }\n  div > input,\n  div > a,\n  div > button,\n  div > select {\n    background: ", ";\n    font: ", ";\n    line-height: ", ";\n    text-transform: none;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    display: inline-block;\n    padding: 0 ", ";\n    width: 50%;\n    height: ", ";\n    text-align: left;\n  }\n  div > button {\n    color: initial;\n  }\n  div > button:disabled {\n    color: ", ";\n    cursor: default;\n    background: ", ";\n  }\n  div > input {\n    border: ", ";\n    &:disabled {\n      background: ", ";\n    }\n    &[type='checkbox'] {\n      height: auto;\n    }\n  }\n  p {\n    margin-bottom: ", ";\n    white-space: initial;\n  }\n  ", " {\n    display: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.momo800;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.typography.font100;
}, function (props) {
  return props.theme.sizing.scale700;
}, function (props) {
  return props.theme.sizing.scale100;
}, function (props) {
  return props.theme.sizing.scale700;
}, function (props) {
  return props.theme.colors.mono300;
}, function (props) {
  return props.theme.colors.mono300;
}, function (props) {
  return props.theme.borders.border300;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.sizing.scale600;
}, _body.isMobile, function (props) {
  return props.$expanded ? 'block' : 'none';
});

exports.PanelContent = PanelContent;

var SourceLink = _styledComponents.default.a(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  text-align: right;\n  margin-top: ", ";\n  font: ", ";\n  color: ", ";\n  ", " {\n    display: ", ";\n  }\n"])), function (props) {
  return props.theme.sizing.scale300;
}, function (props) {
  return props.theme.typography.font250;
}, function (props) {
  return props.theme.colors.mono800;
}, _body.isMobile, function (props) {
  return props.$expanded ? 'block' : 'none';
});

exports.SourceLink = SourceLink;
//# sourceMappingURL=example.js.map