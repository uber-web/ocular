"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableBodyCell = exports.TableHeaderCell = exports.Table = exports.BlockQuote = exports.Img = exports.Pre = exports.CodeBlock = exports.InlineCode = exports.MarkdownBody = exports.ListItem = exports.List = exports.P = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.GatsbyA = exports.A = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _gatsby = require("gatsby");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20;

var A = _styledComponents.default.a(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  text-decoration: none;\n  color: ", ";\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.linkText;
}, function (props) {
  return props.theme.colors.linkVisited;
}, function (props) {
  return props.theme.colors.linkHover;
}, function (props) {
  return props.theme.colors.linkHover;
});

exports.A = A;
var GatsbyA = (0, _styledComponents.default)(_gatsby.Link)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  text-decoration: none;\n  color: ", ";\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.linkText;
}, function (props) {
  return props.theme.colors.linkVisited;
}, function (props) {
  return props.theme.colors.linkHover;
}, function (props) {
  return props.theme.colors.linkHover;
});
exports.GatsbyA = GatsbyA;

var H1 = _styledComponents.default.h1(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  letter-spacing: 0.02em;\n  margin: 4px 0 24px;\n"])), function (props) {
  return props.theme.typography.font800;
});

exports.H1 = H1;

var H2 = _styledComponents.default.h2(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  margin: 24px 0 16px;\n"])), function (props) {
  return props.theme.typography.font700;
});

exports.H2 = H2;

var H3 = _styledComponents.default.h3(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font600;
});

exports.H3 = H3;

var H4 = _styledComponents.default.h4(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font500;
});

exports.H4 = H4;

var H5 = _styledComponents.default.h5(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font450;
});

exports.H5 = H5;

var H6 = _styledComponents.default.h6(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font350;
});

exports.H6 = H6;

var P = _styledComponents.default.p(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  margin: '0 0 16px';\n"])));

exports.P = P;

var List = _styledComponents.default.ul(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 0 12px;\n"])));

exports.List = List;

var ListItem = _styledComponents.default.li(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 4px;\n"])));

exports.ListItem = ListItem;

var MarkdownBody = _styledComponents.default.div(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n  font: ", ";\n  padding: 36px;\n  max-width: 692px;\n"])), function (props) {
  return props.theme.typography.font300;
});

exports.MarkdownBody = MarkdownBody;

var InlineCode = _styledComponents.default.code(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  border-radius: ", ";\n  padding: 0 5px;\n  font-family: Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',\n    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',\n    'Nimbus Mono L', 'Courier New', Courier, monospace;\n  font-size: 0.9em;\n  margin: 1px 0;\n  line-height: calc(1.5em / 0.9 - 2px);\n  display: inline-block;\n  vertical-align: top;\n"])), function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.sizing.scale100;
});

exports.InlineCode = InlineCode;

var CodeBlock = _styledComponents.default.code(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2.default)(["\n  font-family: Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',\n    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',\n    'Nimbus Mono L', 'Courier New', Courier, monospace;\n  font-size: 0.9em;\n  direction: ltr;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  tab-size: 4;\n  hyphens: none;\n  background-color: ", ";\n"])), function (props) {
  return props.theme.colors.mono200;
});

exports.CodeBlock = CodeBlock;

var Pre = _styledComponents.default.pre(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 14px;\n  background-color: ", ";\n  padding: ", ";\n  overflow-x: auto;\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: slategray;\n  }\n\n  .token.punctuation {\n    color: #999;\n  }\n\n  .token.namespace {\n    opacity: 0.7;\n  }\n\n  .token.property,\n  .token.tag,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.deleted {\n    color: #905;\n  }\n\n  .token.selector,\n  .token.attr-name,\n  .token.string,\n  .token.char,\n  .token.builtin,\n  .token.inserted {\n    color: #690;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #9a6e3a;\n    background: hsla(0, 0%, 100%, 0.5);\n  }\n\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword {\n    color: #07a;\n  }\n\n  .token.function,\n  .token.class-name {\n    color: #dd4a68;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #e90;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n"])), function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.sizing.scale200;
});

exports.Pre = Pre;

var Img = _styledComponents.default.img(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 100%;\n"])));

exports.Img = Img;

var BlockQuote = _styledComponents.default.blockquote(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2.default)(["\n  background-color: ", ";\n  margin-inline-start: 0;\n  margin-inline-end: 0;\n  padding: ", " ", ";\n"])), function (props) {
  return props.theme.colors.warning100;
}, function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale600;
});

exports.BlockQuote = BlockQuote;

var Table = _styledComponents.default.table(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2.default)(["\n  border-collapse: collapse;\n  border-spacing: 1px;\n  width: 100%;\n"])));

exports.Table = Table;

var TableHeaderCell = _styledComponents.default.th(_templateObject19 || (_templateObject19 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 4px;\n  text-align: left;\n  background: ", ";\n  font-weight: bold;\n  border: 1px solid ", ";\n"])), function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono400;
});

exports.TableHeaderCell = TableHeaderCell;

var TableBodyCell = _styledComponents.default.td(_templateObject20 || (_templateObject20 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 4px;\n  text-align: left;\n  border: 1px solid ", ";\n"])), function (props) {
  return props.theme.colors.mono400;
});

exports.TableBodyCell = TableBodyCell;
//# sourceMappingURL=typography.js.map