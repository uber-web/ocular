import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

import styled from 'styled-components';
export var isMobile = function isMobile(props) {
  return "@media screen and (max-width: ".concat(props.theme.breakpoints.medium, "px)");
};
export var BodyContainerFull = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin: 0 auto;\n  padding: ", " 0 0;\n  ", " {\n    padding: 0;\n    order: 2;\n  }\n"])), function (props) {
  return props.theme.sizing.scale1600;
}, isMobile);
export var BodyContainerToC = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n  padding: ", " 0 0 300px;\n  ", " {\n    height: calc(100vh - ", ");\n    padding: 0;\n    order: 2;\n  }\n"])), function (props) {
  return props.theme.sizing.scale1600;
}, isMobile, function (props) {
  return props.theme.sizing.scale1600;
});
export var BodyContainerInner = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n  position: relative;\n"])));
export var Body = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  font: ", ";\n  width: 100vw;\n  height: 100vh;\n"])), function (props) {
  return props.theme.typography.font300;
});
//# sourceMappingURL=body.js.map