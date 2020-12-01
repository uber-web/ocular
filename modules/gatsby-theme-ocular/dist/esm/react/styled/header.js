import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;

import React from 'react';
import { Link } from 'gatsby';
import { isMobile } from './body';
import styled from 'styled-components';
export var Header = styled.header(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  z-index: 1001;\n  align-items: center;\n  background-color: ", ";\n  color: ", ";\n  display: flex;\n  height: ", ";\n  justify-content: space-between;\n  padding: 0 36px;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  user-select: none;\n  white-space: nowrap;\n  position: fixed;\n  ", " {\n    position: static;\n  }\n"])), function (props) {
  return props.theme.colors.mono1000;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.sizing.scale1600;
}, isMobile);
export var HeaderContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  grid-column: 1/3;\n  grid-row: 1/2;\n  ", " {\n    order: 1;\n  }\n"])), isMobile);
export var HeaderMenuBlock = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n"])));
export var HeaderLogo = styled(Link)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  font: ", ";\n  text-decoration: none;\n  color: ", ";\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.typography.font450;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});
export var HeaderLogoExternal = styled.a(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.typography.font450;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});
export var HeaderMenu = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background: ", ";\n  display: flex;\n  box-sizing: content-box;\n  flex-direction: column;\n  position: absolute;\n  overflow: hidden;\n  min-width: 180px;\n  max-height: ", "px;\n  padding-bottom: ", ";\n  top: ", ";\n  left: ", ";\n  transition-property: max-height, padding-bottom;\n  transition-duration: ", ";\n  transition-timing-function: ", ";\n  z-index: 100;\n\n  ", " {\n    width: 100%;\n    left: 0;\n  }\n"])), function (props) {
  return props.theme.colors.mono1000;
}, function (props) {
  return props.$collapsed ? 0 : props.$nbItems * 48;
}, function (props) {
  return props.$collapsed ? 0 : props.theme.sizing.scale800;
}, function (props) {
  return props.theme.sizing.scale1600;
}, function (props) {
  return props.theme.sizing.scale600;
}, function (props) {
  return props.theme.animation.timing400;
}, function (props) {
  return props.theme.animation.easeInOutCurve;
}, isMobile);
export var HeaderMenuBackground = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: transparent;\n  z-index: 1;\n\n  ", " {\n    background: rgba(0, 0, 0, 0.3);\n  }\n"])), isMobile);
export var HeaderMenuLink = styled.a(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  display: block;\n  padding: ", " ", ";\n  text-decoration: none;\n  font: ", ";\n\n  ", " {\n    font: ", ";\n  }\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale1600;
}, function (props) {
  return props.theme.typography.font300;
}, isMobile, function (props) {
  return props.theme.typography.font500;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});
export var HeaderLinksBlock = styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n\n  ", " {\n    display: block;\n  }\n"])), isMobile);
var StyledHamburgerMenu = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  cursor: pointer;\n  justify-content: space-between;\n  display: flex;\n  flex-direction: column;\n  padding: 3px 1px 4px;\n  margin-right: ", ";\n  height: ", ";\n  width: ", ";\n"])), function (props) {
  return props.theme.sizing.scale600;
}, function (props) {
  return props.theme.sizing.scale800;
}, function (props) {
  return props.theme.sizing.scale800;
});
var HamburgerBar = styled.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  height: 1px;\n  width: 100%;\n"])), function (props) {
  return props.theme.colors.mono100;
});
export var HamburgerMenu = function HamburgerMenu(_ref) {
  var onClick = _ref.onClick;
  return React.createElement(StyledHamburgerMenu, {
    onClick: onClick
  }, React.createElement(HamburgerBar, null), React.createElement(HamburgerBar, null), React.createElement(HamburgerBar, null));
};
export var HeaderLink = styled(Link)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  color: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});
export var HeaderLinkExternal = styled.a(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  color: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});
export var HeaderLinkContainer = styled.div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  font: ", ";\n  flex: 1 1 0;\n  padding-left: ", ";\n\n  ", " {\n    font: ", ";\n    padding: ", " ", ";\n  }\n"])), function (props) {
  return props.theme.typography.font300;
}, function (props) {
  return props.theme.sizing.scale700;
}, isMobile, function (props) {
  return props.theme.typography.font500;
}, function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale1000;
});
export var TocToggle = styled.div(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  color: ", ";\n  cursor: pointer;\n  line-height: ", ";\n  user-select: none;\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.sizing.scale1600;
});
//# sourceMappingURL=header.js.map