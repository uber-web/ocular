import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

import { Link } from 'gatsby';
import styled from 'styled-components';
import { A } from './typography';
export var SearchContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  height: ", ";\n  margin-bottom: 20px;\n  background: ", ";\n"])), function (props) {
  return props.theme.sizing.scale1000;
}, function (props) {
  return props.theme.colors.mono200;
});
export var IconContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n"])), function (props) {
  return props.theme.sizing.scale1000;
}, function (props) {
  return props.theme.sizing.scale1000;
});
export var SearchInput = styled.input(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  border: 1px solid ", ";\n  transition: 0.3s;\n  font-size: 14px;\n  font-weight: 500;\n  line-jeight: 20px;\n  padding: 10px 10px 10px 40px;\n  &:focus {\n    box-shadow: ", ";\n    border-color: rgb(39, 110, 241);\n    outline: none;\n  }\n"])), function (props) {
  return props.theme.colors.mono500;
}, function (props) {
  return props.theme.lighting.shadow600;
});
export var MainSearch = styled.main(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  font: ", ";\n  width: 600px;\n  max-width: 90%;\n  margin: ", " auto 0px;\n"])), function (props) {
  return props.theme.typography.font300;
}, function (props) {
  return props.theme.sizing.scale2400;
});
export var SearchResultItem = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  margin: 1em 0;\n"])));
export var SearchResultLink = styled(Link)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  font: ", ";\n  margin-bottom: 0.5rem;\n  color: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
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
export var SearchResultHighlight = styled.span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: inline-block;\n  background: yellow;\n"])));
export var SearchResultPager = styled(A)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  padding: 20px 0 80px;\n"])));
//# sourceMappingURL=search.js.map