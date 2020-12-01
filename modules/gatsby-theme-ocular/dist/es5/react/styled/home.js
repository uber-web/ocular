"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FooterLogo = exports.FooterText = exports.Footer = exports.GetStartedLink = exports.ProjectName = exports.Section = exports.HeroExampleContainer = exports.BannerContainer = exports.Container = exports.Banner = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gatsby = require("gatsby");

var _body = require("./body");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

var Banner = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  height: 30rem;\n  background: ", ";\n  color: ", ";\n  z-index: 0;\n  ", " {\n    height: 80vh;\n  }\n"])), function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'mono900' : 'mono400'];
}, function (props) {
  return props.theme.colors[props.colortheme === 'dark' ? 'mono100' : 'mono900'];
}, _body.isMobile);

exports.Banner = Banner;

var Container = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  padding: 2rem;\n  max-width: 80rem;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n"])));

exports.Container = Container;
var BannerContainer = (0, _styledComponents.default)(Container)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 0;\n  height: auto;\n  padding-left: 4rem;\n  z-index: 0;\n  pointer-events: none;\n"])));
exports.BannerContainer = BannerContainer;

var HeroExampleContainer = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n"])));

exports.HeroExampleContainer = HeroExampleContainer;

var Section = _styledComponents.default.section(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  &:nth-child(2n + 1) {\n    background: #e8e8e8;\n  }\n"])));

exports.Section = Section;

var ProjectName = _styledComponents.default.h1(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 5em;\n  line-height: 1;\n  text-transform: uppercase;\n  letter-spacing: 4px;\n  font-weight: 700;\n  margin: 0;\n  margin-bottom: 16px;\n"])));

exports.ProjectName = ProjectName;
var GetStartedLink = (0, _styledComponents.default)(_gatsby.Link)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  pointer-events: all;\n  font-size: 12px;\n  line-height: 44px;\n  letter-spacing: 2px;\n  font-weight: bold;\n  margin: 24px 0;\n  padding: 0 4rem;\n  pointer-events: all;\n  display: inline-block;\n  text-decoration: none;\n  transition: background-color 250ms ease-in, color 250ms ease-in;\n  border: solid 2px ", ";\n  color: ", ";\n  border-image: linear-gradient(\n    to right,\n    ", " 0%,\n    ", " 100%\n  );\n  border-image-slice: 2;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n    background-color: ", ";\n  }\n"])), function (props) {
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
exports.GetStartedLink = GetStartedLink;

var Footer = _styledComponents.default.footer(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: -$footer-height;\n  width: 100%;\n  z-index: 2;\n  background-image: url(data:image/gif;base64,R0lGODlhIAAgAKIAABUjMRYkMhclM0xXYU1YYgAAAAAAAAAAACwAAAAAIAAgAAADKjgjEP4wyklWmzg/IbTPwPWNZGmeaKqubOu+cCzPdG3feK7vfO//wKAwAQA7);\n  background-size: 32px;\n  background-repeat: repeat;\n  background-position: 16px -8px;\n  color: ", ";\n"])), function (props) {
  return props.theme.colors.mono100;
});

exports.Footer = Footer;

var FooterText = _styledComponents.default.div(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 12px;\n  line-height: 20px;\n  font-weight: 400;\n  letter-spacing: 2px;\n  opacity: 0.4;\n  margin-bottom: 1rem;\n  margin-right: 1rem;\n"])));

exports.FooterText = FooterText;

var FooterLogo = _styledComponents.default.img(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  max-height: 64px;\n  max-width: 64px;\n  display: inline-block;\n"])));

exports.FooterLogo = FooterLogo;
//# sourceMappingURL=home.js.map