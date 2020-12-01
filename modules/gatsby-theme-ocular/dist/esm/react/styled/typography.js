import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20;

import styled from 'styled-components';
import { Link } from 'gatsby';
export var A = styled.a(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  text-decoration: none;\n  color: ", ";\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.linkText;
}, function (props) {
  return props.theme.colors.linkVisited;
}, function (props) {
  return props.theme.colors.linkHover;
}, function (props) {
  return props.theme.colors.linkHover;
});
export var GatsbyA = styled(Link)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  text-decoration: none;\n  color: ", ";\n  &:visited {\n    color: ", ";\n  }\n  &:active {\n    color: ", ";\n  }\n  &:hover {\n    color: ", ";\n  }\n"])), function (props) {
  return props.theme.colors.linkText;
}, function (props) {
  return props.theme.colors.linkVisited;
}, function (props) {
  return props.theme.colors.linkHover;
}, function (props) {
  return props.theme.colors.linkHover;
});
export var H1 = styled.h1(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font: ", ";\n  letter-spacing: 0.02em;\n  margin: 4px 0 24px;\n"])), function (props) {
  return props.theme.typography.font800;
});
export var H2 = styled.h2(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  font: ", ";\n  margin: 24px 0 16px;\n"])), function (props) {
  return props.theme.typography.font700;
});
export var H3 = styled.h3(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font600;
});
export var H4 = styled.h4(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font500;
});
export var H5 = styled.h5(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font450;
});
export var H6 = styled.h6(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  font: ", ";\n"])), function (props) {
  return props.theme.typography.font350;
});
export var P = styled.p(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  margin: '0 0 16px';\n"])));
export var List = styled.ul(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  margin: 0 0 12px;\n"])));
export var ListItem = styled.li(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  margin-bottom: 4px;\n"])));
export var MarkdownBody = styled.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  font: ", ";\n  padding: 36px;\n  max-width: 692px;\n"])), function (props) {
  return props.theme.typography.font300;
});
export var InlineCode = styled.code(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: ", ";\n  padding: 0 5px;\n  font-family: Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',\n    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',\n    'Nimbus Mono L', 'Courier New', Courier, monospace;\n  font-size: 0.9em;\n  margin: 1px 0;\n  line-height: calc(1.5em / 0.9 - 2px);\n  display: inline-block;\n  vertical-align: top;\n"])), function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.sizing.scale100;
});
export var CodeBlock = styled.code(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  font-family: Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',\n    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',\n    'Nimbus Mono L', 'Courier New', Courier, monospace;\n  font-size: 0.9em;\n  direction: ltr;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  tab-size: 4;\n  hyphens: none;\n  background-color: ", ";\n"])), function (props) {
  return props.theme.colors.mono200;
});
export var Pre = styled.pre(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  font-size: 14px;\n  background-color: ", ";\n  padding: ", ";\n  overflow-x: auto;\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: slategray;\n  }\n\n  .token.punctuation {\n    color: #999;\n  }\n\n  .token.namespace {\n    opacity: 0.7;\n  }\n\n  .token.property,\n  .token.tag,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.deleted {\n    color: #905;\n  }\n\n  .token.selector,\n  .token.attr-name,\n  .token.string,\n  .token.char,\n  .token.builtin,\n  .token.inserted {\n    color: #690;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #9a6e3a;\n    background: hsla(0, 0%, 100%, 0.5);\n  }\n\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword {\n    color: #07a;\n  }\n\n  .token.function,\n  .token.class-name {\n    color: #dd4a68;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #e90;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n"])), function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.sizing.scale200;
});
export var Img = styled.img(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n  max-width: 100%;\n"])));
export var BlockQuote = styled.blockquote(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  margin-inline-start: 0;\n  margin-inline-end: 0;\n  padding: ", " ", ";\n"])), function (props) {
  return props.theme.colors.warning100;
}, function (props) {
  return props.theme.sizing.scale400;
}, function (props) {
  return props.theme.sizing.scale600;
});
export var Table = styled.table(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n  border-collapse: collapse;\n  border-spacing: 1px;\n  width: 100%;\n"])));
export var TableHeaderCell = styled.th(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n  padding: 4px;\n  text-align: left;\n  background: ", ";\n  font-weight: bold;\n  border: 1px solid ", ";\n"])), function (props) {
  return props.theme.colors.mono200;
}, function (props) {
  return props.theme.colors.mono400;
});
export var TableBodyCell = styled.td(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n  padding: 4px;\n  text-align: left;\n  border: 1px solid ", ";\n"])), function (props) {
  return props.theme.colors.mono400;
});
//# sourceMappingURL=typography.js.map