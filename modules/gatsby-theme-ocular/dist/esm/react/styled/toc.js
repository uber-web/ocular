import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

import styled from 'styled-components';
import ChevronDown from '../components/chevron-down';
import { isMobile } from './body';
export var TocChevron = styled(ChevronDown)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  position: absolute;\n  left: ", "px;\n  top: 20px;\n  transform: ", ";\n  transition: transform 0.3s;\n"])), function (props) {
  return props.$depth * 12 + 24;
}, function (props) {
  return props.$isTocOpen ? 'none' : 'rotate(-90deg)';
});
export var TocEntry = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  font: ", ";\n  border-top: 1px solid\n    ", ";\n  color: ", ";\n  cursor: pointer;\n  margin: -0.5px 0;\n  position: relative;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n"])), function (props) {
  return props.theme.typography.font350;
}, function (props) {
  return props.$depth || props.$index === 0 ? 'tranparent' : props.theme.colors.mono400;
}, function (props) {
  return props.$depth ? props.theme.colors.mono800 : props.theme.colors.mono1000;
});
export var TocHeader = styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: block;\n  padding: 16px 16px 16px ", "px;\n  &:hover {\n    background: ", ";\n  }\n"])), function (props) {
  return props.$depth * 12 + 48;
}, function (props) {
  return props.theme.colors.mono200;
});
export var TocLink = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  a {\n    display: block;\n    padding: 16px 16px 16px ", "px;\n    color: ", " !important;\n    text-decoration: none;\n  }\n  &:hover {\n    background: ", ";\n  }\n"])), function (props) {
  return props.$depth * 12 + 48;
}, function (props) {
  return props.$active ? props.theme.colors.primary400 : props.$depth ? props.theme.colors.mono800 : props.theme.colors.mono1000;
}, function (props) {
  return props.theme.colors.mono200;
});
export var TocSubpages = styled.ul(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  list-style: none;\n  margin: 0;\n  max-height: ", "px;\n  overflow: hidden;\n  padding: 0;\n  transition: max-height 0.3s;\n"])), function (props) {
  return props.$height * 56;
});
export var TocContainer = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  padding: ", " 0;\n  max-width: 300px;\n  height: 100%;\n  z-index: 2;\n  border-right: 1px solid ", ";\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%;\n\n  ", " {\n    max-width: 100%;\n    height: initial;\n    border-right: none;\n    position: sticky;\n    padding: 0;\n    transition: opacity 0.3s, transform 0.3s;\n    opacity: ", ";\n    max-height: ", ";\n    overflow: ", ";\n    transform: ", ";\n  }\n"])), function (props) {
  return props.theme.sizing.scale1600;
}, function (props) {
  return props.theme.colors.mono500;
}, isMobile, function (props) {
  return props.$isTocOpen ? 1 : 0;
}, function (props) {
  return props.$isTocOpen ? 'unset' : 0;
}, function (props) {
  return props.$isTocOpen ? 'visible' : 'hidden';
}, function (props) {
  return props.$isTocOpen ? 'translateY(0)' : 'translateY(30px)';
});
//# sourceMappingURL=toc.js.map