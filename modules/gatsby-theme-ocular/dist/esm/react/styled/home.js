import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

import styled from 'styled-components';
import { Link } from 'gatsby';
import { isMobile } from './body';
export var Banner = styled.section(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  height: 30rem;\n  background: ", ";\n  color: ", ";\n  z-index: 0;\n  ", " {\n    height: 80vh;\n  }\n"])), function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'mono900' : 'mono400'];
}, function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'mono100' : 'mono900'];
}, isMobile);
export var Container = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: relative;\n  padding: 2rem;\n  max-width: 80rem;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n"])));
export var BannerContainer = styled(Container)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  height: auto;\n  padding-left: 4rem;\n  z-index: 0;\n  pointer-events: none;\n"])));
export var HeroExampleContainer = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n"])));
export var Section = styled.section(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  &:nth-child(2n + 1) {\n    background: #e8e8e8;\n  }\n"])));
export var ProjectName = styled.h1(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  font-size: 5em;\n  line-height: 1;\n  text-transform: uppercase;\n  letter-spacing: 4px;\n  font-weight: 700;\n  margin: 0;\n  margin-bottom: 16px;\n"])));
export var GetStartedLink = styled(Link)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  pointer-events: all;\n  font-size: 12px;\n  line-height: 44px;\n  letter-spacing: 2px;\n  font-weight: bold;\n  margin: 24px 0;\n  padding: 0 4rem;\n  pointer-events: all;\n  display: inline-block;\n  text-decoration: none;\n  transition: background-color 250ms ease-in, color 250ms ease-in;\n  border: solid 2px ", ";\n  color: ", ";\n  border-image: linear-gradient(\n    to right,\n    ", " 0%,\n    ", " 100%\n  );\n  border-image-slice: 2;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n    background-color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.primary400;
}, function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'mono100' : 'mono900'];
}, function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'primary400' : 'primary700'];
}, function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'primary100' : 'primary400'];
}, function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'mono100' : 'mono900'];
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.primary400;
});
export var Footer = styled.footer(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: -$footer-height;\n  width: 100%;\n  z-index: 2;\n  background-image: url(data:image/gif;base64,R0lGODlhIAAgAKIAABUjMRYkMhclM0xXYU1YYgAAAAAAAAAAACwAAAAAIAAgAAADKjgjEP4wyklWmzg/IbTPwPWNZGmeaKqubOu+cCzPdG3feK7vfO//wKAwAQA7);\n  background-size: 32px;\n  background-repeat: repeat;\n  background-position: 16px -8px;\n  color: ", ";\n"])), function (props) {
  return props.theme.colors.mono100;
});
export var FooterText = styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  font-size: 12px;\n  line-height: 20px;\n  font-weight: 400;\n  letter-spacing: 2px;\n  opacity: 0.4;\n  margin-bottom: 1rem;\n  margin-right: 1rem;\n"])));
export var FooterLogo = styled.img(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  max-height: 64px;\n  max-width: 64px;\n  display: inline-block;\n"])));
//# sourceMappingURL=home.js.map