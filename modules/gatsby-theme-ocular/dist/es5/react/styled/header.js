"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TocToggle = exports.HeaderLinkContainer = exports.HeaderLinkExternal = exports.HeaderLink = exports.HamburgerMenu = exports.HeaderLinksBlock = exports.HeaderMenuLink = exports.HeaderMenuBackground = exports.HeaderMenu = exports.HeaderLogoExternal = exports.HeaderLogo = exports.HeaderMenuBlock = exports.HeaderContainer = exports.Header = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _body = require("./body");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;

var Header = _styledComponents.default.header(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  z-index: 1001;\n  align-items: center;\n  background-color: ", ";\n  color: ", ";\n  display: flex;\n  height: ", ";\n  justify-content: space-between;\n  padding: 0 36px;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  user-select: none;\n  white-space: nowrap;\n  position: fixed;\n  ", " {\n    position: static;\n  }\n"])), function (props) {
  return props.theme.colors.mono1000;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.sizing.scale1600;
}, _body.isMobile);

exports.Header = Header;

var HeaderContainer = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  grid-column: 1/3;\n  grid-row: 1/2;\n  ", " {\n    order: 1;\n  }\n"])), _body.isMobile);

exports.HeaderContainer = HeaderContainer;

var HeaderMenuBlock = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n"])));

exports.HeaderMenuBlock = HeaderMenuBlock;
var HeaderLogo = (0, _styledComponents.default)(_gatsby.Link)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  text-decoration: none;\n  color: ", ";\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
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
exports.HeaderLogo = HeaderLogo;

var HeaderLogoExternal = _styledComponents.default.a(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.typography.font450;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});

exports.HeaderLogoExternal = HeaderLogoExternal;

var HeaderMenu = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  display: flex;\n  box-sizing: content-box;\n  flex-direction: column;\n  position: absolute;\n  overflow: hidden;\n  min-width: 180px;\n  max-height: ", "px;\n  padding-bottom: ", ";\n  top: ", ";\n  left: ", ";\n  transition-property: max-height, padding-bottom;\n  transition-duration: ", ";\n  transition-timing-function: ", ";\n  z-index: 100;\n\n  ", " {\n    width: 100%;\n    left: 0;\n  }\n"])), function (props) {
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
}, _body.isMobile);

exports.HeaderMenu = HeaderMenu;

var HeaderMenuBackground = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: transparent;\n  z-index: 1;\n\n  ", " {\n    background: rgba(0, 0, 0, 0.3);\n  }\n"])), _body.isMobile);

exports.HeaderMenuBackground = HeaderMenuBackground;

var HeaderMenuLink = _styledComponents.default.a(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  padding: ", " ", ";\n  text-decoration: none;\n  font: ", ";\n\n  ", " {\n    font: ", ";\n  }\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale1600;
}, function (props) {
  return props.theme.typography.font300;
}, _body.isMobile, function (props) {
  return props.theme.typography.font500;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});

exports.HeaderMenuLink = HeaderMenuLink;

var HeaderLinksBlock = _styledComponents.default.div(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n\n  ", " {\n    display: block;\n  }\n"])), _body.isMobile);

exports.HeaderLinksBlock = HeaderLinksBlock;

var StyledHamburgerMenu = _styledComponents.default.div(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  cursor: pointer;\n  justify-content: space-between;\n  display: flex;\n  flex-direction: column;\n  padding: 3px 1px 4px;\n  margin-right: ", ";\n  height: ", ";\n  width: ", ";\n"])), function (props) {
  return props.theme.sizing.scale600;
}, function (props) {
  return props.theme.sizing.scale800;
}, function (props) {
  return props.theme.sizing.scale800;
});

var HamburgerBar = _styledComponents.default.div(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  height: 1px;\n  width: 100%;\n"])), function (props) {
  return props.theme.colors.mono100;
});

var HamburgerMenu = function HamburgerMenu(_ref) {
  var onClick = _ref.onClick;
  return _react.default.createElement(StyledHamburgerMenu, {
    onClick: onClick
  }, _react.default.createElement(HamburgerBar, null), _react.default.createElement(HamburgerBar, null), _react.default.createElement(HamburgerBar, null));
};

exports.HamburgerMenu = HamburgerMenu;
var HeaderLink = (0, _styledComponents.default)(_gatsby.Link)(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});
exports.HeaderLink = HeaderLink;

var HeaderLinkExternal = _styledComponents.default.a(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-decoration: none;\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono200;
});

exports.HeaderLinkExternal = HeaderLinkExternal;

var HeaderLinkContainer = _styledComponents.default.div(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  flex: 1 1 0;\n  padding-left: ", ";\n\n  ", " {\n    font: ", ";\n    padding: ", " ", ";\n  }\n"])), function (props) {
  return props.theme.typography.font300;
}, function (props) {
  return props.theme.sizing.scale700;
}, _body.isMobile, function (props) {
  return props.theme.typography.font500;
}, function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale1000;
});

exports.HeaderLinkContainer = HeaderLinkContainer;

var TocToggle = _styledComponents.default.div(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  cursor: pointer;\n  line-height: ", ";\n  user-select: none;\n"])), function (props) {
  return props.theme.colors.mono100;
}, function (props) {
  return props.theme.sizing.scale1600;
});

exports.TocToggle = TocToggle;
//# sourceMappingURL=header.js.map