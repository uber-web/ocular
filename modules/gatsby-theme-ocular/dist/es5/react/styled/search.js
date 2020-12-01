"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResultPager = exports.SearchResultHighlight = exports.SearchResultLink = exports.SearchResultItem = exports.MainSearch = exports.SearchInput = exports.IconContainer = exports.SearchContainer = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _gatsby = require("gatsby");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _typography = require("./typography");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

var SearchContainer = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  height: ", ";\n  margin-bottom: 20px;\n  background: ", ";\n"])), function (props) {
  return props.theme.sizing.scale1000;
}, function (props) {
  return props.theme.colors.mono200;
});

exports.SearchContainer = SearchContainer;

var IconContainer = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n"])), function (props) {
  return props.theme.sizing.scale1000;
}, function (props) {
  return props.theme.sizing.scale1000;
});

exports.IconContainer = IconContainer;

var SearchInput = _styledComponents.default.input(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  border: 1px solid ", ";\n  transition: 0.3s;\n  font-size: 14px;\n  font-weight: 500;\n  line-jeight: 20px;\n  padding: 10px 10px 10px 40px;\n  &:focus {\n    box-shadow: ", ";\n    border-color: rgb(39, 110, 241);\n    outline: none;\n  }\n"])), function (props) {
  return props.theme.colors.mono500;
}, function (props) {
  return props.theme.lighting.shadow600;
});

exports.SearchInput = SearchInput;

var MainSearch = _styledComponents.default.main(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  width: 600px;\n  max-width: 90%;\n  margin: ", " auto 0px;\n"])), function (props) {
  return props.theme.typography.font300;
}, function (props) {
  return props.theme.sizing.scale2400;
});

exports.MainSearch = MainSearch;

var SearchResultItem = _styledComponents.default.div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 1em 0;\n"])));

exports.SearchResultItem = SearchResultItem;
var SearchResultLink = (0, _styledComponents.default)(_gatsby.Link)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  margin-bottom: 0.5rem;\n  color: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.typography.font450;
}, function (props) {
  return props.theme.colors.linkText;
}, function (props) {
  return props.theme.colors.linkVisited;
}, function (props) {
  return props.theme.colors.linkHover;
}, function (props) {
  return props.theme.colors.linkHover;
});
exports.SearchResultLink = SearchResultLink;

var SearchResultHighlight = _styledComponents.default.span(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-block;\n  background: yellow;\n"])));

exports.SearchResultHighlight = SearchResultHighlight;
var SearchResultPager = (0, _styledComponents.default)(_typography.A)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  cursor: pointer;\n  padding: 20px 0 80px;\n"])));
exports.SearchResultPager = SearchResultPager;
//# sourceMappingURL=search.js.map